/**
 * Calcule la bounding box des 3 premiers <path> du logo Markus (le « M » seul)
 * et écrit public/brand/logo-markus-mark.svg avec un viewBox serré.
 *
 * Les paths sont en coordonnées « Potrace-like » : après le M absolu initial,
 * tous les pairs de nombres sont des lineto RELATIFS implicites.
 * Le <g> applique transform="translate(0,1968) scale(0.1,-0.1)" → on transforme.
 */
const fs = require("fs");
const path = require("path");

const srcPath = path.resolve(__dirname, "..", "public", "brand", "logo-markus.svg");
const dstPath = path.resolve(__dirname, "..", "public", "brand", "logo-markus-mark.svg");

const svg = fs.readFileSync(srcPath, "utf-8");

// Récupère les 3 premiers <path d="..."/>
const pathDs = [...svg.matchAll(/<path d="([^"]+)"/g)].slice(0, 3).map((m) => m[1]);

function bboxOfPath(d) {
  // Tokenize : commands ([A-Za-z]) ou nombres signés (avec . et e)
  const toks = d.match(/[A-Za-z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g);
  let x = 0, y = 0;
  let xMin = Infinity, yMin = Infinity, xMax = -Infinity, yMax = -Infinity;
  let cmd = null;
  let i = 0;
  const update = () => {
    if (x < xMin) xMin = x;
    if (y < yMin) yMin = y;
    if (x > xMax) xMax = x;
    if (y > yMax) yMax = y;
  };
  while (i < toks.length) {
    const t = toks[i];
    if (/^[A-Za-z]$/.test(t)) {
      cmd = t;
      i++;
      continue;
    }
    // Implicit continuation = on ré-utilise la dernière commande
    const n1 = parseFloat(toks[i]);
    switch (cmd) {
      case "M": x = n1; y = parseFloat(toks[i + 1]); update(); i += 2; cmd = "L"; break;
      case "m": x += n1; y += parseFloat(toks[i + 1]); update(); i += 2; cmd = "l"; break;
      case "L": x = n1; y = parseFloat(toks[i + 1]); update(); i += 2; break;
      case "l": x += n1; y += parseFloat(toks[i + 1]); update(); i += 2; break;
      case "H": x = n1; update(); i += 1; break;
      case "h": x += n1; update(); i += 1; break;
      case "V": y = n1; update(); i += 1; break;
      case "v": y += n1; update(); i += 1; break;
      case "C":
        x = parseFloat(toks[i + 4]); y = parseFloat(toks[i + 5]); update(); i += 6; break;
      case "c":
        x += parseFloat(toks[i + 4]); y += parseFloat(toks[i + 5]); update(); i += 6; break;
      case "S":
        x = parseFloat(toks[i + 2]); y = parseFloat(toks[i + 3]); update(); i += 4; break;
      case "s":
        x += parseFloat(toks[i + 2]); y += parseFloat(toks[i + 3]); update(); i += 4; break;
      case "Q":
        x = parseFloat(toks[i + 2]); y = parseFloat(toks[i + 3]); update(); i += 4; break;
      case "q":
        x += parseFloat(toks[i + 2]); y += parseFloat(toks[i + 3]); update(); i += 4; break;
      case "T":
        x = n1; y = parseFloat(toks[i + 1]); update(); i += 2; break;
      case "t":
        x += n1; y += parseFloat(toks[i + 1]); update(); i += 2; break;
      case "Z":
      case "z":
        i++; break;
      default:
        i++;
    }
  }
  return { xMin, yMin, xMax, yMax };
}

// Combine bboxes
let global = { xMin: Infinity, yMin: Infinity, xMax: -Infinity, yMax: -Infinity };
for (const d of pathDs) {
  const b = bboxOfPath(d);
  if (b.xMin < global.xMin) global.xMin = b.xMin;
  if (b.yMin < global.yMin) global.yMin = b.yMin;
  if (b.xMax > global.xMax) global.xMax = b.xMax;
  if (b.yMax > global.yMax) global.yMax = b.yMax;
}

console.log("Raw bbox (path coords):", global);

// Apply transform translate(0,1968) scale(0.1,-0.1)
// (x, y) → (x * 0.1, 1968 + y * -0.1)
const tx = (x) => x * 0.1;
const ty = (y) => 1968 + y * -0.1;

const xs = [tx(global.xMin), tx(global.xMax)];
const ys = [ty(global.yMin), ty(global.yMax)];
const vbX = Math.min(...xs);
const vbY = Math.min(...ys);
const vbW = Math.max(...xs) - vbX;
const vbH = Math.max(...ys) - vbY;

// Petit padding pour ne pas couper les bords
const pad = Math.max(vbW, vbH) * 0.04;
const finalVb = `${(vbX - pad).toFixed(2)} ${(vbY - pad).toFixed(2)} ${(vbW + pad * 2).toFixed(2)} ${(vbH + pad * 2).toFixed(2)}`;

console.log("Tight viewBox:", finalVb);

const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${finalVb}" fill="currentColor" role="img" aria-label="Markus Immobilier — Mark">
<g transform="translate(0,1968) scale(0.1,-0.1)" fill="currentColor">
<path d="${pathDs[0]}"/>
<path d="${pathDs[1]}"/>
<path d="${pathDs[2]}"/>
</g>
</svg>
`;

fs.writeFileSync(dstPath, markSvg);
console.log("Mark written:", dstPath, fs.statSync(dstPath).size, "bytes");

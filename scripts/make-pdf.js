// Génère un PDF placeholder simple pour /public/bareme-honoraires-markus.pdf
const fs = require("fs");
const path = require("path");

function buildPdf(lines) {
  let y = 800;
  let stream = "";
  for (const ln of lines) {
    const isTitle = ln.startsWith("# ");
    const isSection = ln.startsWith("§ ");
    const sz = isTitle ? 22 : isSection ? 14 : 11;
    const text = ln.replace(/^[#§]\s?/, "");
    const safe = text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
    stream += `BT /F1 ${sz} Tf 50 ${y} Td (${safe}) Tj ET\n`;
    y -= isTitle ? 30 : isSection ? 22 : 16;
  }

  const objects = [];
  objects.push("<</Type/Catalog/Pages 2 0 R>>");
  objects.push("<</Type/Pages/Count 1/Kids[3 0 R]>>");
  objects.push(
    "<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>",
  );
  objects.push(`<</Length ${stream.length}>>\nstream\n${stream}endstream`);
  objects.push("<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>");

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((obj, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => {
    pdf += String(o).padStart(10, "0") + " 00000 n \n";
  });
  pdf += `trailer\n<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefOffset}\n%%EOF`;
  return pdf;
}

const lines = [
  "# MARKUS IMMOBILIER",
  "§ Bareme des honoraires",
  "",
  "04 78 37 13 67 - villeurbanne@markusimmobilier.fr",
  "87 rue Edouard Vaillant, 69100 Villeurbanne",
  "",
  "§ TRANSACTION (a la charge du vendeur)",
  "Inferieur a 25 000 EUR : 2 000 EUR",
  "De 25 000 a 50 000 EUR : 5 000 EUR",
  "De 50 001 a 170 000 EUR : 9 000 EUR",
  "De 170 001 a 300 000 EUR : 6 %",
  "De 300 001 a 500 000 EUR : 5 %",
  "De 500 001 a 700 000 EUR : 4 %",
  "De 700 001 a 1 000 000 EUR : 3,5 %",
  "Superieur a 1 000 000 EUR : 3 %",
  "",
  "§ LOCATION (part locataire)",
  "Hors zones tendues et tres tendues : 8 EUR/m2",
  "Zones tendues : 10 EUR/m2",
  "Zone tres tendue : 12 EUR/m2",
  "Etat des lieux entree : 3 EUR/m2",
  "Etat des lieux sortie : 3 EUR/m2",
  "Garage / Parking / Box / Cave : 120 EUR",
  "",
  "§ LOCATION (part proprietaire)",
  "9 % du loyer annuel HC",
  "",
  "§ GESTION LOCATIVE",
  "Honoraires de base : 6 % (min. 25 EUR)",
  "Frais et debours extranet : 20 EUR/an",
  "Frais correspondance courrier : 45 EUR/lot",
  "Assurance GLI : 2,5 % du loyer",
  "Vacation horaire : 100 EUR",
  "Cloture fin de gestion : 90 EUR + 10 EUR/lot suppl.",
  "Gestion des travaux : 5 % du montant",
  "",
  "Document placeholder - PDF officiel a recevoir du client.",
];

const out = path.resolve(__dirname, "..", "public", "bareme-honoraires-markus.pdf");
fs.writeFileSync(out, buildPdf(lines));
console.log("PDF written:", out, fs.statSync(out).size, "bytes");

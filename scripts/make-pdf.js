// Génère le PDF du barème d'honoraires Markus Immobilier (public/bareme-honoraires-markus.pdf)
// via PDFKit → PDF bien formé, lisible dans tous les navigateurs/visionneuses.
//   node scripts/make-pdf.js
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const ANTHRACITE = "#383E42";
const SAUGE = "#9EA596";
const GRIS = "#F4F5F3";

const out = path.resolve(__dirname, "..", "public", "bareme-honoraires-markus.pdf");
const doc = new PDFDocument({ size: "A4", margin: 50 });
doc.pipe(fs.createWriteStream(out));

const W = doc.page.width;
const M = doc.page.margins.left;
const CW = W - M * 2;

// ---- En-tête ----
doc.rect(0, 0, W, 90).fill(ANTHRACITE);
doc.fill("#ffffff").fontSize(22).font("Helvetica-Bold").text("MARKUS IMMOBILIER", M, 28);
doc.fill(SAUGE).fontSize(11).font("Helvetica").text("Barème des honoraires", M, 56);
doc
  .fill("#cdd2cb")
  .fontSize(9)
  .text(
    "87 rue Édouard Vaillant, 69100 Villeurbanne  ·  04 78 37 13 67  ·  villeurbanne@markusimmobilier.fr",
    M,
    72,
  );

let y = 120;

function sectionTitle(label, sub) {
  doc.rect(M, y, CW, 24).fill(GRIS);
  doc.fill(ANTHRACITE).font("Helvetica-Bold").fontSize(12).text(label, M + 10, y + 6);
  y += 30;
  if (sub) {
    doc.fill("#7a817f").font("Helvetica-Oblique").fontSize(9).text(sub, M + 2, y);
    y += 16;
  }
}

function row(left, right) {
  if (y > doc.page.height - 70) {
    doc.addPage();
    y = 60;
  }
  doc.fill("#3d4347").font("Helvetica").fontSize(10).text(left, M + 4, y, { width: CW - 120 });
  doc.fill(ANTHRACITE).font("Helvetica-Bold").fontSize(10).text(right, M + CW - 116, y, {
    width: 112,
    align: "right",
  });
  y += 18;
  doc.moveTo(M, y - 4).lineTo(M + CW, y - 4).strokeColor("#e7e9e4").lineWidth(0.5).stroke();
}

// ---- Transaction ----
sectionTitle("Transaction", "Honoraires TTC à la charge du vendeur");
[
  ["Inférieur à 25 000 €", "2 000 €"],
  ["De 25 000 € à 50 000 €", "5 000 €"],
  ["De 50 001 € à 170 000 €", "9 000 €"],
  ["De 170 001 € à 300 000 €", "6 %"],
  ["De 300 001 € à 500 000 €", "5 %"],
  ["De 500 001 € à 700 000 €", "4 %"],
  ["De 700 001 € à 1 000 000 €", "3,5 %"],
  ["Supérieur à 1 000 000 €", "3 %"],
].forEach(([l, r]) => row(l, r));
y += 10;

// ---- Location ----
sectionTitle("Location", "Baux d'habitation (loi du 6 juillet 1989, conforme ALUR) + meublés");
doc.fill(ANTHRACITE).font("Helvetica-Bold").fontSize(10).text("Part locataire", M + 4, y);
y += 16;
[
  ["Hors zones tendues et très tendues", "8 €/m²"],
  ["Zones tendues", "10 €/m²"],
  ["Zone très tendue", "12 €/m²"],
  ["État des lieux d'entrée", "3 €/m²"],
  ["État des lieux de sortie", "3 €/m²"],
  ["Garage · Parking · Box · Cave", "120 €"],
].forEach(([l, r]) => row(l, r));
y += 6;
doc.fill(ANTHRACITE).font("Helvetica-Bold").fontSize(10).text("Part propriétaire", M + 4, y);
y += 16;
row("Calculés sur le loyer annuel hors charges", "9 %");
y += 10;

// ---- Gestion locative ----
sectionTitle("Gestion locative", "Tarifs TTC");
[
  ["Honoraires de base (sur encaissements mensuels par lot, min. 25 €)", "6 %"],
  ["Frais et débours / extranet", "20 €/an"],
  ["Frais annuel de correspondance (envoi courrier)", "45 €/lot"],
  ["Assurance GLI (garantie loyers impayés)", "2,5 %"],
  ["Vacation horaire (sinistre, expertise, réception travaux…)", "100 €"],
  ["Document d'aide à la déclaration des revenus fonciers", "70 € + 10 €/lot"],
  ["Clôture fin de gestion (dossier + état comptable)", "90 € + 10 €/lot"],
  ["Gestion des travaux", "5 % du montant"],
].forEach(([l, r]) => row(l, r));

// ---- Pied de page ----
doc
  .fill("#9aa09d")
  .font("Helvetica")
  .fontSize(8)
  .text(
    "Markus Immobilier — SARL · 87 rue Édouard Vaillant, 69100 Villeurbanne · Barème affiché conformément à l'arrêté du 10 janvier 2017.",
    M,
    doc.page.height - 55,
    { width: CW, align: "center" },
  );

doc.end();
console.log("PDF écrit :", out);

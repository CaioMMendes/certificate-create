import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {
  const req = await request.json();
  const certificatePath = path.join(
    process.cwd(),
    "public/assets/viseg_certificateWhite.pdf"
  );
  const certificateBuffer = fs.readFileSync(certificatePath);
  const certificateDoc = await PDFDocument.load(certificateBuffer);
  const certificatePage = certificateDoc.getPages();

  // Crie um QR code com os dados desejados
  const qrData = "Seus dados para o QR Code";
  const qrCode = await QRCode.toBuffer(qrData);
  // Embed the Helvetica font
  const timesNewRomanItalicFont = await certificateDoc.embedFont(
    StandardFonts.TimesRomanItalic
  );
  // Adicione o QR code à página do certificado
  const qrImage = await certificateDoc.embedPng(qrCode);
  const { width, height } = certificatePage[1].getSize();
  certificatePage[1].drawImage(qrImage, {
    x: width - 120, // Posição X
    y: 20, // Posição Y
    width: 100, // Largura do QR code
    height: 100, // Altura do QR code
  });

  //escrevendo o restante
  // Draw a string of text diagonally across the first page
  certificatePage[0].drawText(req.name, {
    x: 100,
    y: height / 2,
    size: 40,
    font: timesNewRomanItalicFont,
    color: rgb(0, 0, 0),
  });
  certificatePage[0].drawText(req.name, {
    x: 100,
    y: height / 2 - 185,
    size: 20,
    color: rgb(0, 0, 0),
  });

  // Salve o PDF gerado
  const pdfBytes = await certificateDoc.save();
  console.log(pdfBytes);
  fs.writeFile(`./public/assets/${req.name}.pdf`, pdfBytes, (err) => {
    if (err) {
      console.error("Erro ao gravar o arquivo:", err);
    } else {
      console.log(`Arquivo ${"fileName"} criado com sucesso.`);
    }
  });
  return new NextResponse(pdfBytes, {
    status: 200,
    headers: { "Content-Type": "application/pdf" },
  });
}

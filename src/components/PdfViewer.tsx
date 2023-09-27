// pages/pdf-viewer.js

import { useEffect } from "react";

function PDFViewer({ pdfData }: any) {
  useEffect(() => {
    // Crie uma Blob a partir dos bytes do PDF
    const pdfBlob = new Blob([pdfData], { type: "application/pdf" });
    console.log(pdfBlob);
    // Crie uma URL de objeto a partir do Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);
    console.log(pdfUrl);
    // Crie um elemento <iframe> para exibir o PDF
    const iframe = document.createElement("iframe");
    iframe.src = pdfUrl;
    iframe.style.width = "100%";
    iframe.style.height = "500px";

    // Adicione o elemento ao DOM
    document.body.appendChild(iframe);

    // Limpe a URL do objeto quando a página for desmontada
    return () => {
      document.body.removeChild(iframe);
      URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfData]);

  return null; // Não renderiza nada diretamente na página
}

export default PDFViewer;

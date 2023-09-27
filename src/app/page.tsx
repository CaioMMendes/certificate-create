"use client";
import PDFViewer from "@/components/PdfViewer";
import { useState, useEffect } from "react";
export default function Home() {
  const [pdf, setPdf] = useState();
  useEffect(() => {
    fetch(`/generate`, {
      method: "POST",
    }).then((response: any) => setPdf(response));
  }, []);
  console.log(pdf);
  return (
    <main>
      aa
      <PDFViewer pdfData={pdf} />
    </main>
  );
}

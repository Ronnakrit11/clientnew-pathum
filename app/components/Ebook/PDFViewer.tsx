// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "./pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ link }: any) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [width, setWidth] = useState<number>(window.innerWidth * 0.8);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // Mobile
        setWidth(screenWidth * 0.8); // ใช้ 90% ของหน้าจอ
      } else if (screenWidth < 1024) {
        // Tablet
        setWidth(screenWidth * 0.7); // ใช้ 70% ของหน้าจอ
      } else {
        // Desktop
        setWidth(screenWidth * 0.5); // ใช้ 50% ของหน้าจอ
      }
    };

    handleResize(); // เรียกใช้ครั้งแรกเพื่อกำหนดค่าเริ่มต้น
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages: nextNumPages }: any) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="w-full flex justify-center">
      <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages as number }, (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            width={width} // ปรับขนาดตามหน้าจอ
          />
        ))}
      </Document>
    </div>
  );
}
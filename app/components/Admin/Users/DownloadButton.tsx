import React from "react";
import { Dropdown } from "flowbite-react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { font, logo } from "./font"; // Ensure this file contains the correct font data

const DownloadButton = ({ filteredData }) => {
  const { data } = useGetAllUsersQuery(undefined, {});

  const headers = [
    "คำนำ",
    "ชื่อ",
    "รหัสนักศึกษา",
    "สถานะ",
    "ปีการศึกษา",
    "แขนง",
    "สาขาวิชา",
    "หลักสูตร",
  ];

  const transformData = (dataToTransform) =>
    dataToTransform.map((user) => [
      user.prefix || "-",
      user.name || "-",
      user.studentId || "-",
      user.status || "-",
      user.academicYear || "-",
      user.sect?.name || "-",
      user.major?.name || "-",
      user.program?.name || "-",
    ]);

  const ExcelDownload = (dataToDownload) => {
    if (!dataToDownload || dataToDownload.length === 0) {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
      return;
    }

    const finalData = [headers, ...transformData(dataToDownload)];

    try {
      const ws = XLSX.utils.aoa_to_sheet(finalData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Users");
      XLSX.writeFile(wb, "Users.xlsx");
    } catch (error) {
      console.error("Error generating Excel file:", error);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลด Excel");
    }
  };

  const PDFDownload = (dataToDownload) => {
    if (!dataToDownload || dataToDownload.length === 0) {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
      return;
    }

    const doc = new jsPDF();

    try {
      // Add custom font
      doc.addFileToVFS("Sarabun-Regular-normal.ttf", font);
      doc.addFont("Sarabun-Regular-normal.ttf", "Sarabun-Regular", "normal");

      // Set font and size
      doc.setFont("Sarabun-Regular");
      doc.setFontSize(8);

      doc.autoTable({
        head: [headers],
        body: transformData(dataToDownload),
        startY: 10,
        styles: {
          font: "Sarabun-Regular",
          fontSize: 6,
        },
        tableWidth: "auto", // Auto-scale the table
        pageBreak: "auto", // Allows table to continue onto a new page
      });

      // Save the generated PDF
      doc.save("Users.pdf");
    } catch (error) {
      console.error("Error generating PDF file:", error);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลด PDF");
    }
  };

  return (
    <Dropdown label="ดาวโหลดไฟล์" dismissOnClick={false}>
      <Dropdown.Item onClick={() => ExcelDownload(filteredData)}>
        Download Excel (Filter)
      </Dropdown.Item>
      <Dropdown.Item onClick={() => PDFDownload(filteredData)}>
        Download PDF (Filter)
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() =>
          ExcelDownload(data?.users?.filter((user) => user.role === "user"))
        }
      >
        Download Excel (ทั้งหมด)
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() =>
          PDFDownload(data?.users?.filter((user) => user.role === "user"))
        }
      >
        Download PDF (ทั้งหมด)
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DownloadButton;

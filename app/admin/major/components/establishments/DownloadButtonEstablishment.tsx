import React from "react";
import { Dropdown } from "flowbite-react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { font, logo } from "./font"; // Ensure this file contains the correct font data
import { useGetUserByMajorQuery } from "@/redux/features/user/userApi";
import { useGetEstablishmentByMajorQuery } from "@/redux/features/establishment/establishmentApi";

const DownloadButtonEstablishment = ({ filteredData, major }) => {
  const { data } = useGetUserByMajorQuery({ major }, {});
  const { data: establishmentData } = useGetEstablishmentByMajorQuery({
    major,
  });

  // console.log(establishmentData?.establishment);
  const headers = [
    "ชื่อสถานประกอบการ",
    "ประเภทสถานประกอบการ",
    "หน่วยงานที่นักศึกษาออกสหกิจ",
    "ที่ตั้ง",
    "เบอร์สถานประกอบการ",
    "ชื่อพนักงานติดต่อ",
    "หมายเลขพนักงานติดต่อ",
    "Line ID พนักงานติดต่อ",
    "รายละเอียดเพิ่มเติม",
    "อีเมลล์สถานประกอบการ",
    "หมายเหตุ อื่นๆ",
  ];

  // console.log(filteredData);

  const transformData = (dataToTransform) =>
    dataToTransform?.map((item) => [
      item.name || "-",
      item.category || "-",
      item.agency || "-",
      item.address || "-",
      item.phone_number || "-",
      item.name_of_establishment || "-",
      item.phone_number_of_establishment || "-",
      item.idLine_of_establishment || "-",
      item.details || "-",
      item.email || "-",
      item.note || "-",
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
      doc.addFileToVFS("Sarabun-Regular-normal.ttf", font);
      doc.addFont("Sarabun-Regular-normal.ttf", "Sarabun-Regular", "normal");

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
        onClick={() => ExcelDownload(establishmentData?.establishment)}
      >
        Download Excel (ทั้งหมด)
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => PDFDownload(establishmentData?.establishment)}
      >
        Download PDF (ทั้งหมด)
      </Dropdown.Item>
    </Dropdown>
  );
};

export default DownloadButtonEstablishment;

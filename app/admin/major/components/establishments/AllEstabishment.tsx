"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import ModalCreateEstablishment from "./ModalCreateEstablishment";
import { useGetAllEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import ModalInforEstablishment from "./ModalInfoEsblishment";
import ModalDeleteEsblishment from "./ModelDeleteEsblishment";
import ModalEditEstablishment from "./ModalEditEstablishment";
import { Pagination, Select } from "flowbite-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const AllEstabishment = ({ major }: { major: string }) => {
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const payloadSearch = {
    name: searchName,
    major: major,
    page: currentPage,
    limit: limit,
  };

  const { data: dataAllEstablishments, refetch: refetchAllEstablishments } =
    useGetAllEstablishmentsQuery(payloadSearch);
  // console.log(dataAllEstablishments?.establishments);

  const onPageChange = (page: number) => setCurrentPage(page);

  const downloadPDF = () => {
    const table: any = document.querySelector(".overflow-x-auto"); // เลือกส่วนของตาราง
    if (!table) {
      alert("ไม่พบข้อมูลสำหรับการสร้าง PDF");
      return;
    }

    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20; // ลดขอบ 10 มม. ทั้งซ้ายและขวา
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let y = 10; // เริ่มต้นที่ 10 มม. จากขอบบน
      if (imgHeight > pageHeight) {
        // ถ้าสูงเกิน 1 หน้า ให้แบ่งหน้า
        while (y < canvas.height) {
          pdf.addImage(
            imgData,
            "PNG",
            10,
            y - canvas.height,
            imgWidth,
            imgHeight
          );
          y += pageHeight;
          if (y < canvas.height) pdf.addPage();
        }
      } else {
        pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
      }
      pdf.save("thesis_users.pdf");
    });
  };

  const downloadExcel = () => {
    if (dataAllEstablishments?.establishments?.length > 0) {
      const headers = [
        "ลำดับ",
        "ชื่อสถานประกอบการ",
        "ประเภทสถานประกอบการ",
        "หน่วยงานที่นักศึกษาออกสหกิจ",
        "ที่ตั้ง",
        "เบอร์สถานประกอบการ",
        "ชื่อพนักงานติดต่",
        "หมายเลขพนักงานติดต่อ",
        "Line ID พนักงานติดต่อ",
        "รายละเอียดเพิ่มเติม",
        "อีเมลล์สถานประกอบการ",
        "หมายเหตุ อื่นๆ",
      ];
      const rows = dataAllEstablishments.establishments.map((item, index) => [
        index + 1,
        item?.name || "-",
        item?.category || "-",
        item?.agency || "-",
        item?.address || "-",
        item?.phone_number || "-",
        item?.name_of_establishment || "-",
        item?.phone_number_of_establishment || "-",
        item?.idLine_of_establishment || "-",
        item?.details || "-",
        item?.email || "-",
        item?.note || "-",
      ]);

      // Combine headers and rows
      const worksheetData = [headers, ...rows];

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Estabishment");

      // Export the workbook
      XLSX.writeFile(workbook, "estabishment.xlsx");
    } else {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
    }
  };
  
  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex flex-col-reverse gap-2 md:flex-row justify-between mb-4 ">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อสถานประกอบการณ์" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-full md:w-[400px]"
            placeholder="กรุณากรอกชื่อที่จะค้นหา"
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <ModalCreateEstablishment
            refetch={refetchAllEstablishments}
            major={major}
          />
          <div className="flex flex-row gap-2">
            <Button
              color="success"
              className="flex items-center gap-2"
              onClick={downloadExcel}
            >
              <FaFileExcel size={20} className="mr-2" />
              Export Excel
            </Button>
            <Button
              color="failure"
              className="flex items-center gap-2"
              onClick={downloadPDF}
            >
              <FaFilePdf size={20} className="mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ลำดับ</Table.HeadCell>
            <Table.HeadCell>ชื่อสถานประกอบการ</Table.HeadCell>
            <Table.HeadCell>จังหวัด</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex justify-between items-center gap-2">
                ดำเนินการ
                <Select
                  aria-label="เลือกรายการต่อหน้า"
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </Select>
              </div>
            </Table.HeadCell>{" "}
          </Table.Head>
          <Table.Body className="divide-y">
            {dataAllEstablishments?.establishments.map(
              (establishments, index) =>
                establishments?.role !== "admin" && (
                  <Table.Row key={establishments._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </Table.Cell>
                    <Table.Cell>{establishments.name}</Table.Cell>
                    <Table.Cell>{establishments.address}</Table.Cell>
                    {/* <Table.Cell>
                      {establishments.name_of_establishment}
                    </Table.Cell> */}
                    <Table.Cell className="flex gap-1">
                      <ModalInforEstablishment data={establishments} />
                      <ModalEditEstablishment
                        data={establishments}
                        refetch={refetchAllEstablishments}
                      />
                      <ModalDeleteEsblishment
                        data={establishments}
                        refetch={refetchAllEstablishments}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AllEstabishment;

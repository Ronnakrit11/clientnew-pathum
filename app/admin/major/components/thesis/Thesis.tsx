import React, { useState } from "react";
import {
  Table,
  Button,
  Pagination,
  Label,
  TextInput,
  Select,
} from "flowbite-react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import UploadThesis from "./UploadThesis";
import { useGetAllUserSuccessQuery } from "@/redux/features/user/userApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const Thesis = () => {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { id }: any = useParams();
  // console.log(id);
  const {
    data: dataAllUserSuccess,
    isLoading,
    isError,
    refetch,
  } = useGetAllUserSuccessQuery(
    {
      major: id,
      name,
      page: currentPage,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const onPageChange = (page: number) => setCurrentPage(page);
  // console.log(dataAllUserSuccess);
  // ฟังก์ชันแปลงข้อมูลเป็น CSV

  const convertToCSV = (data) => {
    const headers = [
      "ลำดับ",
      "ชื่อนักศึกษา",
      "สาขาวิชา",
      "แขนงวิชา",
      "ชื่อปริญญานิพนธ์",
      "ปีการศึกษา",
      "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 1",
      "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 2",
      "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 3",
    ];
    const rows = data.map((user, index) => [
      index + 1,
      user?.name,
      user?.major?.name,
      user?.program?.name,
      user?.thesis?.url,
      user?.academicYear,
      user?.thesis?.advisor1,
      user?.thesis?.advisor2,
      user?.thesis?.advisor3,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    return csvContent;
  };

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
    if (dataAllUserSuccess?.users?.length > 0) {
      const headers = [
        "ลำดับ",
        "ชื่อนักศึกษา",
        "สาขาวิชา",
        "แขนงวิชา",
        "ชื่อปริญญานิพนธ์",
        "ปีการศึกษา",
        "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 1",
        "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 2",
        "อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 3",
      ];
      const rows = dataAllUserSuccess.users.map((user, index) => [
        index + 1,
        user?.name,
        user?.major?.name,
        user?.program?.name,
        user?.thesis?.title || "ยังไม่อัพโหลด",
        user?.academicYear || "-",
        user?.thesis?.advisor1 || "-",
        user?.thesis?.advisor2 || "-",
        user?.thesis?.advisor3 || "-",
      ]);

      // Combine headers and rows
      const worksheetData = [headers, ...rows];

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Thesis Users");

      // Export the workbook
      XLSX.writeFile(workbook, "thesis_users.xlsx");
    } else {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
    }
  };

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Label htmlFor="name" value="ค้นหาชื่อนักศึกษา" />
          <TextInput
            id="name"
            type="text"
            className="w-[400px] mt-2"
            placeholder="กรุณากรอกชื่อที่จะค้นหา"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-2">
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

      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>ชื่อหัวข้อปริญญานิพนธ์</Table.HeadCell>
            <Table.HeadCell>อาจารย์ที่ปรึกษา</Table.HeadCell>
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
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {isLoading ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center">
                  กำลังโหลดข้อมูล...
                </Table.Cell>
              </Table.Row>
            ) : isError ? (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center text-red-500">
                  เกิดข้อผิดพลาดในการดึงข้อมูล
                </Table.Cell>
              </Table.Row>
            ) : dataAllUserSuccess?.users?.length > 0 ? (
              dataAllUserSuccess.users.map(
                (user) =>
                  user.role !== "admin" && (
                    <Table.Row key={user._id}>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </Table.Cell>
                      <Table.Cell>{user.studentId}</Table.Cell>
                      <Table.Cell>{user.major?.name}</Table.Cell>
                      <Table.Cell>{user.program?.name}</Table.Cell>
                      <Table.Cell>
                        {user?.thesis ? (
                          <>
                            <Link href={user?.thesis?.url} target="_blank">
                              <p className="underline text-red-600">
                                {user?.thesis?.title}
                              </p>
                            </Link>
                          </>
                        ) : (
                          "ยังไม่อัพโหลด"
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {user?.thesis?.advisor?.map((advisor, index) => (
                          <p key={index}>
                            {/* {advisor.name} :{" "} */}
                            {index + 1}.{" "}
                            <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                              {advisor}
                            </span>
                          </p>
                        ))}
                      </Table.Cell>
                      <Table.Cell>
                        <UploadThesis
                          user={user}
                          refetch={refetch}
                          majorId={id}
                        />
                      </Table.Cell>
                    </Table.Row>
                  )
              )
            ) : (
              <Table.Row>
                <Table.Cell colSpan={6} className="text-center">
                  ไม่มีข้อมูล
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Thesis;

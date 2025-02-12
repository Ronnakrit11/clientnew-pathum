"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { Pagination } from "flowbite-react";
import { useListUserByMajorQuery } from "@/redux/features/user/userApi";
import ModalInfoUser from "@/app/components/Admin/Users/ModalInfoUser";
import ModalDelete from "@/app/components/Admin/Users/ModalDelete";
import ModalEditUser from "@/app/components/Admin/Users/ModalEditUser";
import DrawerFilter from "./DrawerFilter";
import ModalCreateUserMajor from "./ModalCreateUserMajor";
import ModalEditUserMajor from "./ModalEditUserMajor";
import { useParams } from "next/navigation";
import { useGetMajorByIdQuery } from "@/redux/features/major/majorApi";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

const AllUserByMajor = () => {
  const { id }: any = useParams();

  const { data: majorData } = useGetMajorByIdQuery(
    { id: id },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    name: "",
    major: id,
    dateStart: new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toISOString(),
    dateEnd: new Date().toISOString(),
    status: "",
    studentId: "i",
    createdAt: -1,
  });

  const { data, refetch } = useListUserByMajorQuery(payload, {
    refetchOnMountOrArgChange: true,
  });

  // console.log(data?.data);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const onPageChange = (page: number) => setPayload({ ...payload, page });
  // console.log(data?.data);

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
    if (data?.data?.length > 0) {
      const headers = [
        "ลำดับ",
        "รหัสนักศึกษา",
        "ชื่อ-นามสกุล",
        "สถานะการศึกษา",
        "หลักสูตร",
        "สาขาวิชา",
        "ปีการศึกษา",
        "อีเมลล์",
        "เบอร์โทรศัพท์",
        "Line ID",
        "ที่อยู่",
        "สถานประกอบการณ์ฝึกงาน",
        "ประเภทสถานประกอบการ",
        "หน่วยงานที่นักศึกษาออกสหกิจ",
        "เบอร์สถานประกอบการ",
        "ชื่อพนักงานติดต่อ",
        "Line ID พนักงานติดต่อ",
        "รายละเอียดเพิ่มเติม",
        "หมายเหตุ อื่นๆ",
        "หัวข้อปริญญานิพนธ์",
        "ไฟล์ Download",
        "อาจารย์ที่ปรึกษาคนที่ 1",
        "อาจารย์ที่ปรึกษาคนที่ 2",
        "อาจารย์ที่ปรึกษาคนที่ 3",
      ];
      const rows = data.data.map((item, index) => [
        index + 1,
        item?.studentId || "-",
        item?.name || "-",
        item?.status || "-",
        item?.program?.name || "-",
        item?.major?.name || "-",
        item?.academicYear || "-",
        item?.email || "-",
        item?.phoneNumber || "-",
        item?.lineId || "-",
        item?.address || "-",
        item?.intern?.name || "-",
        item?.intern?.category || "-",
        item?.intern?.agency || "-",
        item?.intern?.phone_number || "-",
        item?.intern?.name_of_establishment || "-",
        item?.intern?.idLine_of_establishment || "-",
        item?.intern?.address || "-",
        item?.intern?.note || "-",
        item?.thesis?.name || "-",
        item?.thesis?.url || "-",
        item?.thesis?.advisor1 || "-",
        item?.thesis?.advisor2 || "-",
        item?.thesis?.advisor3 || "-",
      ]);

      // Combine headers and rows
      const worksheetData = [headers, ...rows];

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Create a workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

      // Export the workbook
      XLSX.writeFile(workbook, "users.xlsx");
    } else {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
    }
  };
  return (
    <div className="w-[300px] md:container mx-auto mt-24 p-4">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex flex-col items-end md:flex-row gap-2">
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value="ค้นหาชื่อนักศึกษา หรือรหัสนักศึกษา"
              />
            </div>
            <TextInput
              id="name"
              type="text"
              className="w-full md:w-[400px]"
              placeholder="กรุณากรอกชื่อหรือรหัสนักศึกษาที่จะค้นหา"
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              required
            />
          </div>
          <div>
            <DrawerFilter setPayload={setPayload} payload={payload} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ModalCreateUserMajor
            refetch={refetch}
            major={id}
            program={majorData?.data?.program}
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
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>สถานะ</Table.HeadCell>
            <Table.HeadCell>
              <div className="flex justify-between items-center gap-2">
                ดำเนินการ
                <Select
                  aria-label="เลือกรายการต่อหน้า"
                  value={payload.limit}
                  onChange={(e) =>
                    setPayload({ ...payload, limit: Number(e.target.value) })
                  }
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
            {data?.data.map(
              (user) =>
                user?.role !== "admin" && (
                  <Table.Row key={user._id}>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {user.prefix + " " + user.name}
                    </Table.Cell>
                    <Table.Cell>{user.studentId}</Table.Cell>
                    <Table.Cell>{user.major?.name}</Table.Cell>
                    <Table.Cell>{user.program?.name}</Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell className="flex gap-2">
                      <ModalInfoUser data={user} />
                      <ModalEditUserMajor
                        data={user}
                        refetch={refetch}
                        major={id}
                        program={majorData?.data?.program}
                      />
                      <ModalDelete data={user} refetch={refetch} />
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={payload.page}
          totalPages={100}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default AllUserByMajor;

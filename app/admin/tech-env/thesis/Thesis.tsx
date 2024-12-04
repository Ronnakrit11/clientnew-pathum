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

const Thesis = () => {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: dataAllUserSuccess,
    isLoading,
    isError,
    refetch,
  } = useGetAllUserSuccessQuery(
    {
      major: "เทคโนโลยีสิ่งแวดล้อมการเกษตร",
      name,
      page: currentPage,
      limit,
    },
    { refetchOnMountOrArgChange: true }
  );

  const onPageChange = (page: number) => setCurrentPage(page);

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
      user.name,
      user.major,
      user.program,
      user.thesis.url,
      user.academicYear,
      user?.thesis?.advisor1,
      user?.thesis?.advisor2,
      user?.thesis?.advisor3,
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    return csvContent;
  };

  const downloadCSV = () => {
    if (dataAllUserSuccess?.users?.length > 0) {
      const csvContent = convertToCSV(dataAllUserSuccess.users);

      // เพิ่ม BOM เพื่อรองรับภาษาไทย
      const bom = "\uFEFF";
      const blob = new Blob([bom + csvContent], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "thesis_users.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
    }
  };

  return (
    <div className="container mx-auto mt-24">
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
        <div>
          <Button
            color="success"
            className="flex items-center gap-2"
            onClick={downloadCSV}
          >
            <FaFileExcel size={20} className="mr-2" />
            Export Excel (CSV)
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
            <Table.HeadCell>อาจารย์ที่ปรึกษา</Table.HeadCell>
            <Table.HeadCell>เอกสารปริญญาตรี</Table.HeadCell>
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
                      <Table.Cell>{user.major}</Table.Cell>
                      <Table.Cell>{user.program}</Table.Cell>
                      <Table.Cell>
                        {user?.thesis?.advisor1}
                        <br />
                        {user?.thesis?.advisor2}
                        <br />
                        {user?.thesis?.advisor3}
                      </Table.Cell>
                      <Table.Cell>
                        {user?.thesis ? (
                          <Link href={user.thesis.url} target="_blank">
                            <Button color="dark">
                              <FaFilePdf />
                            </Button>
                          </Link>
                        ) : (
                          "ยังไม่อัพโหลด"
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <UploadThesis id={user._id} refetch={refetch} />
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
        <div className="flex justify-center items-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Thesis;

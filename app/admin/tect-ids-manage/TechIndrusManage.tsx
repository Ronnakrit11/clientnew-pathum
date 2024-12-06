"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput, Select } from "flowbite-react";
import { Pagination } from "flowbite-react";
import { useListUserByMajorQuery } from "@/redux/features/user/userApi";
import ModalInfoUser from "@/app/components/Admin/Users/ModalInfoUser";
import ModalDelete from "@/app/components/Admin/Users/ModalDelete";
import ModalEditUser from "@/app/components/Admin/Users/ModalEditUser";
// import DrawerFilter from "./DrawerFilter";
// import ModalCreateUserMajor from "./ModalCreateUserMajor";
// import ModalEditUserMajor from "./ModalEditUserMajor";
import ModalCreateUserMajor from "../en-it/ModalCreateUserMajor";
import ModalEditUserMajor from "../en-it/ModalEditUserMajor";
import DrawerFilter from "../en-it/DrawerFilter";

const TechIndrusManage = () => {
  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    name: "",
    major: "สาขาวิชาเทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม",
    dateStart: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    dateEnd: new Date(),
    status: "",
    studentId: "i",
    createdAt: -1,
  });

  // console.log(payload);

  // const {
  //   data: dataAllUserEngineerAndIT,
  //   refetch: refetchAllUserEngineerAndIT,
  // } = useAllUserEngineerAndITQuery(
  //   { name: searchName, page: currentPage, limit },
  //   { refetchOnMountOrArgChange: true }
  // );

  const { data, refetch } = useListUserByMajorQuery(payload, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const onPageChange = (page: number) => setPayload({ ...payload, page });

  return (
    <div className="container mx-auto mt-24">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
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
              className="w-[400px]"
              placeholder="กรุณากรอกชื่อหรือรหัสนักศึกษาที่จะค้นหา"
              onChange={(e) => setPayload({ ...payload, name: e.target.value })}
              required
            />
          </div>
          <div className="flex items-end">
            <DrawerFilter setPayload={setPayload} payload={payload} />
          </div>
        </div>
        <div>
          <ModalCreateUserMajor
            refetch={refetch}
            major={"สาขาวิชาเทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม"}
          />
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
                      {user.name}
                    </Table.Cell>
                    <Table.Cell>{user.studentId}</Table.Cell>
                    <Table.Cell>{user.major}</Table.Cell>
                    <Table.Cell>{user.program}</Table.Cell>
                    <Table.Cell>{user.status}</Table.Cell>
                    <Table.Cell className="flex gap-2">
                      <ModalInfoUser data={user} />
                      <ModalEditUserMajor data={user} refetch={refetch} />
                      <ModalDelete data={user} refetch={refetch} />
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
          <Pagination
            currentPage={payload.page}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TechIndrusManage;

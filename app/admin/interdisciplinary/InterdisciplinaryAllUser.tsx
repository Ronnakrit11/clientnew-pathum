"use client";
import React, { useState } from "react";
import { Table } from "flowbite-react";
import {
  Button,
  Checkbox,
  Label,
  TextInput,
  Pagination,
  Select,
} from "flowbite-react";
import {
  useAllInterdisciplinaryQuery,
  useAllUserArgTechQuery,
  useAllUserEngineerAndITQuery,
  useGetAllUsersQuery,
} from "@/redux/features/user/userApi";
import { useListUserByMajorQuery } from "@/redux/features/user/userApi";

import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import ModalCreateUser from "@/app/components/Admin/Users/ModalCreateUser";
import ModalInfoUser from "@/app/components/Admin/Users/ModalInfoUser";
import ModalDelete from "@/app/components/Admin/Users/ModalDelete";
import ModalEditUser from "@/app/components/Admin/Users/ModalEditUser";

const InterdisciplinaryAllUser = () => {
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // const { data, refetch } = useAllInterdisciplinaryQuery({
  //   name: searchName,
  //   page: currentPage,
  //   limit: limit,
  // },{refetchOnMountOrArgChange: true});

  const { data, refetch } = useListUserByMajorQuery(
    { major: "สาขาวิชาสหวิทยาการ" },
    { refetchOnMountOrArgChange: true }
  );
  const onPageChange = (page: number) => setCurrentPage(page);
  return (
    <div className="container mx-auto mt-24">
      <div className="flex justify-between mb-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อนักศึกษา" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-[400px]"
            placeholder="กรุณากรอกชื่อที่จะค้นหา"
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
        </div>
        <div>
          <ModalCreateUser refetch={refetch} />
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
              <div className="flex items-center gap-2">
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
                      <ModalEditUser data={user} refetch={refetch} />
                      <ModalDelete data={user} refetch={refetch} />
                    </Table.Cell>
                  </Table.Row>
                )
            )}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto sm:justify-center">
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

export default InterdisciplinaryAllUser;

"use client";
import React, { useState } from "react";
import { Select, Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import ModalInfoUser from "./ModalInfoUser";
import ModalCreateUser from "./ModalCreateUser";
import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import ModalDelete from "./ModalDelete";
import { Badge } from "flowbite-react";
import ModalEditUser from "./ModalEditUser";
import { Pagination } from "flowbite-react";

const NewAllUsers = () => {
  // const {
  //   isLoading: isLoadingUsers,
  //   data,
  //   refetch,
  // } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [searchName, setSearchName] = useState("");
  const { data: searchUserByName, refetch } = useSearchUserByNameQuery({
    name: searchName,
    page: currentPage,
    limit: limit,
    role: "user",
  });

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
          <Table.Head className="text-md">
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>สถานะ</Table.HeadCell>
            <Table.HeadCell className="flex justify-between items-center">
              ดำเนินการ{" "}
              <Select
                value={limit}
                onChange={(e: any) => setLimit(e.target.value)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Select>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {searchUserByName?.user
              .filter((user) => user.role === "user")
              .map((user) => (
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
              ))}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto my-8 sm:justify-center">
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

export default NewAllUsers;

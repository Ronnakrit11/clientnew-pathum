"use client";
import React, { useState, useEffect } from "react";
import { Select, Table } from "flowbite-react";
import { Label, TextInput } from "flowbite-react";
import ModalInfoUser from "./ModalInfoUser";
import ModalDelete from "./ModalDelete";
import ModalEditUser from "./ModalEditUser";
import { Pagination } from "flowbite-react";
import DrawerFilter from "@/app/admin/en-it/DrawerFilter";
import { useListUserByMajorQuery } from "@/redux/features/user/userApi";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import DownloadButton from "./DownloadButton";
const NewAllUsers = () => {
  const [filter, setFilter] = useState<{
    program: string[];
    major: string[];
    sect: string[];
  }>({
    program: [],
    major: [],
    sect: [],
  });
  // console.log(filter);
  const { data: majorData } = useGetAllMajorQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [payload, setPayload] = useState({
    page: 1,
    limit: 10,
    name: "",
    major: "",
    dateStart: new Date(
      new Date().setMonth(new Date().getMonth() - 1)
    ).toISOString(),
    dateEnd: new Date().toISOString(),
    status: "",
    studentId: "i",
    createdAt: -1,
  });

  useEffect(() => {
    if (majorData?.data) {
      const major = majorData.data.map((item: any) => item._id);
      const result = major
        .map((item, index) => (index === 0 ? item : `major=${item}`))
        .join("&");
      setPayload((prev) => ({ ...prev, major: result }));
    }
  }, [majorData]);

  const { data, refetch } = useListUserByMajorQuery(payload, {
    refetchOnMountOrArgChange: true,
  });

  const onPageChange = (page: number) => setPayload({ ...payload, page: page });
  // console.log(data);
  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex justify-between items-center mb-4">
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
            <DrawerFilter
              setPayload={setPayload}
              payload={payload}
              filter={filter}
              setFilter={setFilter}
            />
          </div>
        </div>

        <div className="flex items-end justify-end">
          <DownloadButton
            filteredData={data?.data
              ?.filter((user) => user.role === "user")
              .filter(
                (user) =>
                  !filter.program.length ||
                  filter.program.includes(user.program?._id)
              )
              .filter(
                (user) =>
                  !filter.major.length || filter.major.includes(user.major?._id)
              )
              .filter(
                (user) =>
                  !filter.sect.length || filter.sect.includes(user.sect?._id)
              )}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-md">
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>รหัสนักศึกษา</Table.HeadCell>
            <Table.HeadCell>แขนง</Table.HeadCell>
            <Table.HeadCell>สาขาวิชา</Table.HeadCell>
            <Table.HeadCell>หลักสูตร</Table.HeadCell>
            <Table.HeadCell>สถานะ</Table.HeadCell>
            <Table.HeadCell className="flex justify-between items-center">
              ดำเนินการ{" "}
              <Select
                value={payload.limit}
                onChange={(e: any) =>
                  setPayload({ ...payload, limit: e.target.value })
                }
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Select>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.data
              .filter((user) => user.role === "user")
              .filter(
                (user) =>
                  !filter.program.length ||
                  filter.program.includes(user.program?._id)
              )
              .filter(
                (user) =>
                  !filter.major.length || filter.major.includes(user.major?._id)
              )
              .filter(
                (user) =>
                  !filter.sect.length || filter.sect.includes(user.sect?._id)
              )
              .map((user) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.studentId}</Table.Cell>
                  <Table.Cell>{user.sect?.name}</Table.Cell>
                  <Table.Cell>{user.major?.name}</Table.Cell>
                  <Table.Cell>{user.program?.name}</Table.Cell>
                  <Table.Cell>{user.status}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <ModalInfoUser data={user} refetch={refetch} />
                    <ModalEditUser data={user} refetch={refetch} />
                    <ModalDelete data={user} refetch={refetch} />
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        <div className="flex overflow-x-auto my-8 sm:justify-center">
          <Pagination
            currentPage={payload.page || 1}
            totalPages={100}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewAllUsers;

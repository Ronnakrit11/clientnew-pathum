"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Select } from "flowbite-react";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { useReadUserByIdQuery } from "@/redux/features/user/userApi";
import { Pagination } from "flowbite-react";
import ModalCreateComCo from "./ModalCreateComCo";
import { useListCoworkQuery } from "@/redux/features/cowork/coworkApi";
import ModalInfoComco from "./ModalInfoComCo";
import ModalEditComCo from "./ModalEditComCo";
import ModalDeleteComCo from "./ModalDeleteComco";
import { useSearchCoworkQuery } from "@/redux/features/cowork/coworkApi";

const AllMajor = () => {
  const {
    data: userData,
    isLoading,
    refetch: refetchUserData,
  } = useLoadUserQuery(undefined, {});
  const [
    updateRole,
    {
      isLoading: isLoadingUpdateRole,
      error: UpdateRoleError,
      isSuccess: UpdateRoleSuccess,
    },
  ] = useUpdateUserRoleMutation();
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, refetch } = useSearchCoworkQuery(
    { keywords },
    { refetchOnMountOrArgChange: true }
  );
  // const { data, refetch } = useListCoworkQuery(undefined, {});
  console.log(data);
  const {
    data: userById,
    isLoading: isLoadingUserById,
    refetch: refetchUserById,
  } = useReadUserByIdQuery(userData?.user._id, {
    skip: !userData,
  });

  useEffect(() => {
    if (UpdateRoleSuccess) {
      toast.success("Update Role successfully");
      refetch();
      refetchUserData();
    }
    if (UpdateRoleError) {
      toast.error("Update Role Error");
    }
  }, [UpdateRoleError, UpdateRoleSuccess]);

  // console.log(searchUserByName?.user);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="ค้นหาชื่อหน่วยงาน" />
          </div>
          <TextInput
            id="name"
            type="text"
            className="w-[400px]"
            placeholder="กรุณากรอกชื่อที่จะค้นหา"
            onChange={(e) => setKeywords(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col justify-end">
          <ModalCreateComCo
            refetch={refetchUserById}
            refetch_data={refetch}
            append={userById?.user.appoint}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-md">
            <Table.HeadCell>ชื่อย่อหน่วยงาน</Table.HeadCell>
            <Table.HeadCell>ชื่อหน่วยงาน</Table.HeadCell>
            <Table.HeadCell className="flex justify-between items-center">
              ดำเนินการ
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
            {data &&
              data?.cowork?.map((item: any) => (
                <Table.Row key={item?._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item?.initials}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item?.name}
                  </Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <ModalInfoComco data={item} refetch={refetch} />
                    <ModalEditComCo data={item} refetch={refetch} />
                    <ModalDeleteComCo data={item} refetch={refetch} />
                    {/* <ModalEditMajor data={item} refetch={refetch} />
                    <ModalDeleteMajor data={item} refetch={refetch} /> */}
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
      <Toaster />
    </div>
  );
};

export default AllMajor;

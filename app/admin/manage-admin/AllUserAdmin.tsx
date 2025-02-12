"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import { Select } from "flowbite-react";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useReadUserByIdQuery } from "@/redux/features/user/userApi";
import ModalCreateAdminMajor from "./ModalCreateAdminMajor";
import { Pagination } from "flowbite-react";
import ModalEditAdmin from "./ModalEditAdmin";
import ModalDelete from "@/app/components/Admin/Users/ModalDelete";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { useGetAllAdminQuery } from "@/redux/features/user/userApi";

const AllUserAdmin = () => {
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
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data: majorData } = useGetAllMajorQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: adminData, refetch } = useGetAllAdminQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(adminData?.users?.role);

  const getNewRoleName = (userMajorId) => {
    if (userMajorId === "admin") {
      return userMajorId;
    }
    const id = userMajorId.substring(6);
    const major = majorData?.data?.find((item) => item._id === id);
    return major ? `admin-${major.name}` : "Unknown Role";
  };

  const {
    data: userById,
    isLoading: isLoadingUserById,
    refetch: refetchUserById,
  } = useReadUserByIdQuery(userData?.user._id, {
    skip: !userData,
  });

  // console.log(userById?.user.appoint);

  useEffect(() => {
    if (UpdateRoleSuccess) {
      toast.success("Update Role successfully");
      refetch();
    }
    if (UpdateRoleError) {
      toast.error("Update Role Error");
    }
  }, [UpdateRoleError, UpdateRoleSuccess]);

  const handleChangeRole = (e: any, email: string) => {
    updateRole({
      email: email,
      role: e.target.value,
      id_admin: userData?.user._id,
    });
  };

  // console.log(searchUserByName?.user);
  const onPageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex justify-between items-center mb-4">
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
        <div className="flex flex-col justify-end">
          <ModalCreateAdminMajor
            refetch={refetchUserById}
            refetch_data={refetch}
            append={userById?.user?.appoint}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head className="text-md">
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>อีเมล</Table.HeadCell>
            <Table.HeadCell>ตำแหน่ง</Table.HeadCell>
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
            {adminData &&
              adminData?.users.map((user: any) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{getNewRoleName(user.role)}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <ModalEditAdmin data={user} refetch={refetch} />
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
      <Toaster />
    </div>
  );
};

export default AllUserAdmin;

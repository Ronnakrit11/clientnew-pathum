"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useSearchUserByNameQuery } from "@/redux/features/user/userApi";
import { Select } from "flowbite-react";
import { useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Badge } from "flowbite-react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useReadUserByIdQuery } from "@/redux/features/user/userApi";
import ModalCreateAdminMajor from "./ModalCreateAdminMajor";

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

  const { data: searchUserByName, refetch } =
    useSearchUserByNameQuery(searchName);
  console.log(searchUserByName);

  const {
    data: userById,
    isLoading: isLoadingUserById,
    refetch: refetchUserById,
  } = useReadUserByIdQuery(userData?.user._id, {
    skip: !userData,
  });

  console.log(userById?.user.appoint);

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

  console.log(searchUserByName?.user)

  return (
    <div className="container mx-auto mt-24">
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
          <p className="flex gap-2 justify-center items-center">
            สิทธิในการแต่งตั้งแอดมินสาขา จำนวน{" "}
            <Badge size={"lg"}>{userById?.user.appoint}</Badge> ครั้ง
          </p>
          <ModalCreateAdminMajor
            refetch={refetchUserById}
            refetch_data={refetch}
            append={userById?.user.appoint}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>ชื่อ</Table.HeadCell>
            <Table.HeadCell>อีเมล</Table.HeadCell>
 
            <Table.HeadCell>ตำแหน่ง</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {searchUserByName &&
              searchUserByName?.user?.filter((user: any) => user.role === "admin" || user.role === "admin-engineer-it" || user.role === "admin-tect-env" || user.role === "admin-tech-indrustry").map((user: any) => (
                <Table.Row key={user._id}>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <div className="max-w-md">
                      <Select
                        id="countries"
                        required
                        value={user.role}
                        onChange={(e) => handleChangeRole(e, user.email)}
                        disabled={true}
                      >
                        <option value={"user"}>นักศึกษา</option>
                        <option value={"admin"}>แอดมิน (Super Admin)</option>
                        <option value={"admin-engineer-it"}>
                          แอดมินวิศวกรรมซอฟต์แวร์...
                        </option>
                        <option value={"admin-tect-env"}>
                          แอดมินเทคโนโลยีสิ่งแวดล้อม...
                        </option>
                        <option value={"admin-tech-indrustry"}>
                          แอดมินเทคโนโลยีอุตสาหกรรม...
                        </option>
                        <option value={"admin-engineer-it"}>
                          แอดมินสหวิทยาการ
                        </option>
                      </Select>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
      <Toaster />
    </div>
  );
};

export default AllUserAdmin;

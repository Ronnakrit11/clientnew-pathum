"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUpdateUserByIdMutation } from "@/redux/features/user/userApi";

export default function ModalEditAdmin({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    id: data?._id,
    name: data?.name,
    email: data?.email,
    program: data?.program,
    academicYear: data?.academicYear,
    reason: data?.reason,
    phoneNumber: data?.phoneNumber,
    lineId: data?.lineId,
    address: data?.address,
    status: data?.status,
    studentId: data?.studentId,
    major: data?.major,
  });

  const [updateUser, { isLoading, error, isSuccess }] =
    useUpdateUserByIdMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Add User successfully");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("Add User Error");
    }
  }, [isSuccess, error]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await updateUser(payload);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        outline
        color="warning"
        size={"sm"}
      >
        <HiOutlinePencilSquare size={20} />
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="z-[9999999999999999]"
        >
          <Modal.Header>แก้ไขข้อมูลนักศึกษา {data.name}</Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อ" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                value={payload.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="อีเมลล์" />
              </div>
              <TextInput
                id="email"
                type="text"
                required
                value={payload.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="พาสเวิร์ด" />
              </div>
              <TextInput
                id="password"
                type="text"
                required
                // value={payload.email}
                // onChange={(e) => handleChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit" onClick={handleSubmit} color="warning">
              แก้ไข
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <Toaster />
    </>
  );
}

"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useAddUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useCreateEstablishmentMutation } from "@/redux/features/establishment/establishmentApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateAdminMajorMutation } from "@/redux/features/user/userApi";
import { useCreateMajorMutation } from "@/redux/features/major/majorApi";

export default function ModalCreateMajor({
  refetch,
  refetch_data,
}: any) {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData,
  } = useLoadUserQuery(undefined, {});

  // console.log(userData?.user?._id)
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    id_admin: userData?.user?._id,
  });

  // console.log(payload);

  const [createMajor, { isLoading, error, isSuccess }] =
    useCreateMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างสาขาวิชาเรียบร้อยแล้ว");
      refetch();
      refetch_data();
      setOpenModal(false);
    }
    if (error) {
      toast.error("สร้างสาขาวิชาผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    // console.log(payload);
  };

  const handleSubmit = async () => {
    await createMajor(payload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างบัญชีแอดมิน
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>สร้างขาสาวิชา</Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อสาขาวิชา" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit" onClick={handleSubmit}>
              เพิ่ม
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

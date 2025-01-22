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
import { useCreateMajorMutation } from "@/redux/features/major/majorApi";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";

export default function ModalCreateMajor({ refetch, refetch_data }: any) {
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  // console.log(userData?.user?._id)
  const [openModal, setOpenModal] = useState(false);

  const payloadInitial = {
    name: "",
    program: dataProgram?.programs?.[0]?._id,
  };
  useEffect(() => {
    setPayload(payloadInitial);
  }, [dataProgram]);
  
  const [payload, setPayload] = useState({
    name: "",
    program: dataProgram?.programs?.[0]?._id,
  });

  const [createMajor, { isLoading, error, isSuccess }] =
    useCreateMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างบัญชีแอดมินเรียบร้อยแล้ว");
      refetch();
      refetch_data();
      setOpenModal(false);
    }
    if (error) {
      toast.error("สร้างบัญชีแอดมินผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await createMajor(payload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างหลักสูตร
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>สร้างสาขาวิชา</Modal.Header>
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="program" value="หลักสูตร" />
              </div>
              <Select
                id="program"
                value={payload.program}
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  เลือกหลักสูตร
                </option>
                {dataProgram?.programs?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
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

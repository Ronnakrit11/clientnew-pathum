"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";
import { useCreateSectMutation } from "@/redux/features/sect/sectApi";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";

export default function ModalCreateSect({ refetch, refetch_data }: any) {
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  const { data: dataMajor } = useGetAllMajorQuery(undefined, {});
  // console.log(userData?.user?._id)
  // console.log(dataMajor);
  const [openModal, setOpenModal] = useState(false);

  const payloadInitial = {
    name: "",
    major: dataMajor?.majors?.[0]?._id,
  };

  useEffect(() => {
    setPayload(payloadInitial);
  }, [dataProgram]);

  const [payload, setPayload] = useState({
    name: "",
    major: dataMajor?.majors?.[0]?._id,
  });

  const [createSect, { isLoading, error, isSuccess }] = useCreateSectMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างแขนงเรียบร้อยแล้ว");
      refetch();
      refetch_data();
      setOpenModal(false);
    }
    if (error) {
      toast.error("สร้างแขนงผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await createSect(payload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างแขนง
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>สร้างแขนง</Modal.Header>
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
                <Label htmlFor="major" value="สาขาวิชา" />
              </div>
              <Select
                id="major"
                value={payload.major}
                onChange={(e) => handleChange(e)}
              >
                <option value="" disabled>
                  เลือกสาขาวิชา
                </option>
                {dataMajor?.data?.map((item, index) => (
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

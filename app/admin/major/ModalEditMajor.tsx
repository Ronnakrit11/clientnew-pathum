"use client";

import { Button, Modal, Textarea, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUpdateProgramMutation } from "@/redux/features/program/programApi";
import { useUpdateMajorMutation } from "@/redux/features/major/majorApi";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";

export default function ModalEditMajor({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    id: data?._id,
    name: "",
    program: "",
  });

  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});

  useEffect(() => {
    setPayload({
      id: data?._id,
      name: data?.name,
      program: data?.program?._id,
    });
  }, [data]);

  console.log(data);

  const [updateMajor, { isLoading, error, isSuccess }] =
    useUpdateMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("อัพเดทสาขาวิชาเรียบร้อยแล้ว");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("อัพเดทสาขาวิชาผิดพลาด");
    }
  }, [isSuccess, error]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await updateMajor(payload);
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

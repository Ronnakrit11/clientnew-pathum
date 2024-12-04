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

export default function ModalCreateEstablishment({ refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    category: "",
    agency: "",
    address: "",
    phone_number: "",
    name_of_establishment: "",
    phone_empoyee_of_establishment: "",
    idLine_of_establishment: "",
    details: "",
    major: "สาขาวิชาวิศวกรรมซอฟต์แวร์และระบบสารสนเทศ",
  });

  const [createEstablishment, { isLoading, error, isSuccess }] =
    useCreateEstablishmentMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Add User successfully");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("Add User Error");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await createEstablishment(payload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <HiOutlinePlusSmall className="mr-2" size={20} />
        เพิ่มข้อมูลสถานประกอบการ
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="z-[9999999999999999]"
        >
          <Modal.Header>เพิ่มข้อมูลนักศึกษา</Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อสถานประกอบการ" />
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
                <Label htmlFor="category" value="ประเภทสถานประกอบการ" />
              </div>
              <TextInput
                id="category"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="ที่ตั้ง" />
              </div>
              <TextInput
                id="address"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="agency" value="หน่วยงานที่นักศึกษาออกสหกิจ" />
              </div>
              <TextInput
                id="agency"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone_number" value="เบอร์สถานประกอบการ" />
              </div>
              <TextInput
                id="phone_number"
                type="number"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name_of_establishment"
                  value="ชื่อพนักงานติดต่อ"
                />
              </div>
              <TextInput
                id="name_of_establishment"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="phone_empoyee_of_establishment"
                  value="หมายเลขพนักงานติดต่อ"
                />
              </div>
              <TextInput
                id="phone_empoyee_of_establishment"
                type="number"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="idLine_of_establishment"
                  value="Line ID พนักงานติดต่อ"
                />
              </div>
              <TextInput
                id="idLine_of_establishment"
                type="email"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="details"
                  value="รายละเอียดเกี่ยวกับตำแหน่งงานนักศึกษาที่ออกสหกิจ"
                />
              </div>
              <Textarea
                id="details"
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

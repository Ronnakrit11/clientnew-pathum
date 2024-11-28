"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useAddUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useUpdateUserByIdMutation } from "@/redux/features/user/userApi";
import { useUpdateEstablishmentMutation } from "@/redux/features/establishment/establishmentApi";

export default function ModalEditEstablishment({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    id: data?._id,
    name: data?.name,
    category: data?.category,
    agency: data?.agency,
    address: data?.address,
    phone_number: data?.phone_number,
    name_of_establishment: data?.name_of_establishment,
    phone_empoyee_of_establishment: data?.phone_empoyee_of_establishment,
    idLine_of_establishment: data?.idLine_of_establishment,
    details: data?.details,
  });

  const [updateEstablishment, { isLoading, error, isSuccess }] =
    useUpdateEstablishmentMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("แก้ไขข้อมูลสถานประกอบการเรียบร้อยแล้ว");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("แก้ไขข้อมูลสถานประกอบการไม่ได้");
    }
  }, [isSuccess, error]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await updateEstablishment(payload);
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
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>แก้ไขข้อมูลนักศึกษา {data.name}</Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อสถานประกอบการ" />
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
                <Label htmlFor="category" value="ประเภทสถานประกอบการ" />
              </div>
              <TextInput
                id="category"
                type="text"
                value={payload.category}
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
                value={payload.address}
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
                value={payload.agency}
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
                value={payload.phone_number}
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
                value={payload.name_of_establishment}
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
                value={payload.phone_empoyee_of_establishment}
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
                value={payload.idLine_of_establishment}
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
                value={payload.details}
                onChange={(e) => handleChange(e)}
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

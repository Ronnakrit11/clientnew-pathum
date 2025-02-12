"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { useCreateEstablishmentMutation } from "@/redux/features/establishment/establishmentApi";
import { z } from "zod";

export default function ModalCreateEstablishment({ refetch, major }: any) {
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
    major: major,
    email: "",
    note: "",
  });

  const [createEstablishment, { isLoading, error, isSuccess }] =
    useCreateEstablishmentMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างสถานประกอบการเรียบร้อยแล้ว");
      refetch();
      setOpenModal(false);
      setPayload({
        name: "",
        category: "",
        agency: "",
        address: "",
        phone_number: "",
        name_of_establishment: "",
        phone_empoyee_of_establishment: "",
        idLine_of_establishment: "",
        details: "",
        major: major,
        email: "",
        note: "",
      });
    }
    if (error) {
      toast.error("สร้างสถานประกอบการผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
  };

  // // Zod validation schema
  // const establishmentSchema = z.object({
  //   name: z.string().min(1, "ชื่อสถานประกอบการ is required"),
  //   category: z.string().min(1, "ประเภทสถานประกอบการ is required"),
  //   address: z.string().min(1, "ที่ตั้ง is required"),
  //   agency: z.string().min(1, "หน่วยงานที่นักศึกษาออกสหกิจ is required"),
  //   phone_number: z
  //     .string()
  //     .min(1, "เบอร์สถานประกอบการ is required")
  //     .regex(/^\d+$/, "เบอร์สถานประกอบการ must be a valid number"),
  //   name_of_establishment: z.string().min(1, "ชื่อพนักงานติดต่อ is required"),
  //   phone_empoyee_of_establishment: z
  //     .string()
  //     .min(1, "หมายเลขพนักงานติดต่อ is required")
  //     .regex(/^\d+$/, "หมายเลขพนักงานติดต่อ must be a valid number"),
  //   idLine_of_establishment: z
  //     .string()
  //     .min(1, "Line ID พนักงานติดต่อ is required"),
  //   details: z
  //     .string()
  //     .min(1, "รายละเอียดเกี่ยวกับตำแหน่งงานนักศึกษาที่ออกสหกิจ is required"),
  //   email: z
  //     .string()
  //     .email("อีเมลล์สถานประกอบการณ์ is required")
  //     .min(1, "อีเมลล์สถานประกอบการณ์ is required"),
  //   note: z.string().max(255, "หมายเหตุ อื่นๆ is required"),
  // });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Validate form data with Zod
      // establishmentSchema.parse(payload);

      // If validation is successful, submit the data
      await createEstablishment(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        error.errors.forEach((err) => toast.error(err.message));
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <HiOutlinePlusSmall className="mr-2" size={20} />
        เพิ่มข้อมูลสถานประกอบการ
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>เพิ่มข้อมูลนักศึกษา</Modal.Header>
          <Modal.Body>
            <Label value="ที่อยู่ตามสำเนา" className="text-bold text-[18px]" />
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
            <Label value="ที่อยู่ติดต่อ" className="text-bold text-[18px]" />
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="อีเมลล์สถานประกอบการณ์" />
              </div>
              <TextInput
                id="email"
                type="email"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="note" value="หมายเหตุ อื่นๆ" />
              </div>
              <TextInput id="note" required onChange={(e) => handleChange(e)} />
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

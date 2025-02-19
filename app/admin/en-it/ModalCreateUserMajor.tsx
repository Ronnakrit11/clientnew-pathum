"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useAddUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";
import { z } from "zod";

export default function ModalCreateUserMajor({ refetch, major }: any) {
  const [openModal, setOpenModal] = useState(false);

  const { data: dataMajor } = useGetAllMajorQuery(undefined, {});
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});

  const schema = z.object({
    prefix: z.string().min(1, "คำนำหน้าชื่อจำเป็นต้องกรอก"),
    name: z.string().min(1, "ชื่อสกุลจำเป็นต้องกรอก"),
    email: z.string().email("อีเมลไม่ถูกต้อง"),
    password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
    program: z.string().min(1, "กรุณาเลือกหลักสูตร"),
    academicYear: z.string().min(4, "ปีการศึกษาต้องมีอย่างน้อย 4 หลัก"),
    phoneNumber: z.string().min(1, "กรุณากรอกหมายเลขโทรศัพท์"),
    lineId: z.string().min(1, "กรุณากรอก Line ID"),
    address: z.string().min(1, "กรุณากรอกที่อยู่"),
    status: z.enum(["กำลังศึกษา", "สำเร็จการศึกษา", "พ้นสภาพ"]),
    studentId: z.string().min(1, "กรุณากรอกเลขประจำตัวนักศึกษา"),
    major: z.string().min(1, "กรุณาเลือกสาขาวิชา"),
    reason: z.string().optional(),
  });

  const [payload, setPayload] = useState({
    prefix: "นาย",
    name: "",
    email: "",
    password: "123456",
    program: dataProgram?.programs?.[0]?.name,
    academicYear: "",
    reason: "",
    phoneNumber: "",
    lineId: "",
    address: "",
    status: "",
    studentId: "",
    major: major,
  });

  // console.log(payload);

  const [
    addUser,
    {
      isLoading: isLoadingAddUser,
      error: AddUserError,
      isSuccess: AddUserSuccess,
    },
  ] = useAddUserMutation();

  useEffect(() => {
    if (AddUserSuccess) {
      toast.success("สร้างนักศึกษาเรียบร้อยแล้ว");
      refetch();
      setOpenModal(false);
      setPayload({
        prefix: "",
        name: "",
        email: "",
        password: "",
        program: "",
        academicYear: "",
        reason: "",
        phoneNumber: "",
        lineId: "",
        address: "",
        status: "",
        studentId: "",
        major: "",
      });
    }
    if (AddUserError) {
      toast.error("สร้างนักศึกษาผิดพลาด")
      console.log(AddUserError);
    }
  }, [AddUserError, AddUserSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      schema.parse(payload);
      await addUser(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      }
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-primary hover:bg-secondary"
      >
        <HiMiniUserPlus className="mr-2" size={20} />
        เพิ่มข้อมูลนักศึกษา
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>เพิ่มข้อมูลนักศึกษา</Modal.Header>
          <Modal.Body>
            <div className="grid grid-cols-2 gap-4 justify-end items-end">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="prefix" value="คำนำหน้าชื่อ (Prefix)" />
                </div>
                <Select
                  id="prefix"
                  required
                  onChange={(e) =>
                    setPayload({ ...payload, prefix: e.target.value })
                  }
                  defaultValue={payload.prefix}
                >
                  <option value="นาย">นาย</option>
                  <option value="นางสาว">นางสาว</option>
                  <option value="others">อื่นๆ ระบุ</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="prefix"
                    value="โปรดระบุคำนำหน้าชื่อ (Please enter the prefix)"
                  />
                </div>
                <TextInput
                  disabled={payload.prefix !== "others"}
                  id="prefix"
                  type="text"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อสกุล (Full Name)" />
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
                <Label
                  htmlFor="studentId"
                  value="เลขประจำตัวนักศึกษา (Student ID)"
                />
              </div>
              <TextInput
                id="studentId"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="program" value="ชื่อหลักสูตร (Program Name)" />
              </div>
              <Select
                id="program"
                required={payload.program === ""}
                value={payload.program}
                onChange={(e) =>
                  setPayload({ ...payload, program: e.target.value })
                }
              >
                <option value="" disabled>
                  เลือกหลักสูตร
                </option>
                {/* ตั้งค่า disabled เพื่อป้องกันการเลือก */}
                {dataProgram?.programs?.map((item, index) => (
                  <option value={item.name} key={index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="major" value="ชื่อสาขาวิชา (Major" />
              </div>
              <Select
                id="major"
                required
                onChange={(e) =>
                  setPayload({ ...payload, major: e.target.value })
                }
                defaultValue={major}
              >
                <option value={payload.major} key={0}>
                  {payload.major}
                </option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="academicYear"
                  value="ปีการศึกษา (Academic Year)"
                />
              </div>
              <TextInput
                id="academicYear"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="phoneNumber"
                  value="หมายเลขโทรศัพท์ (Phone Number)"
                />
              </div>
              <TextInput
                id="phoneNumber"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lineId" value="Line ID" />
              </div>
              <TextInput
                id="lineId"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="address" value="ที่อยู่ (Address)" />
              </div>
              <Textarea
                id="address"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Email" />
              </div>
              <TextInput
                id="email"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              onChange={(e: any) =>
                setPayload({ ...payload, status: e.target.value })
              }
            >
              <legend className="mb-4">สถานะการศึกษา</legend>
              <div className="flex items-center gap-2">
                <Radio id="กำลังศึกษา" name="countries" value="กำลังศึกษา" />
                <Label htmlFor="กำลังศึกษา">กำลังศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="สำเร็จการศึกษา"
                  name="countries"
                  value="สำเร็จการศึกษา"
                />
                <Label htmlFor="สำเร็จการศึกษา">สำเร็จการศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="พ้นสภาพ" name="countries" value="พ้นสภาพ" />
                <Label htmlFor="พ้นสภาพ">พ้นสภาพ</Label>
              </div>
            </fieldset>
            {payload.status === "พ้นสภาพ" && (
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="reason"
                    value="เหตุผลที่พ้นการศึกษา (Reason for Dismissal, conditional)"
                  />
                </div>
                <Textarea id="reason" onChange={(e) => handleChange(e)} />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit" color="success" onClick={handleSubmit}>
              เพิ่ม
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </>
  );
}

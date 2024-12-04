"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useAddUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";

export default function ModalCreateUser({ refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "123456",
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
      toast.success("Add User successfully");
      refetch();
      setOpenModal(false);
    }
    if (AddUserError) {
      toast.error("Add User Error");
    }
  }, [AddUserError, AddUserSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await addUser(payload);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="bg-primary hover:bg-secondary"
      >
        <HiMiniUserPlus className="mr-2" size={20} />
        เพิ่มข้อมูลนักศึกษา
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
              <TextInput
                id="program"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              {/* <div className="mb-2 block">
                <Label htmlFor="major" value="ชื่อสาขาวิชา (Major)" />
              </div>
              <TextInput
                id="major"
                type="text"
                onChange={(e) => handleChange(e)}
                required
              /> */}
              <div className="mb-2 block">
                <Label htmlFor="major" value="ชื่อสาขาวิชา (Major" />
              </div>
              <Select
                id="major"
                required
                onChange={(e) =>
                  setPayload({ ...payload, major: e.target.value })
                }
              >
                <option value={""}>เลือกสาขาวิชา</option>
                <option value={"วิศวกรรมซอฟต์แวร์และระบบสารสนเทศ"}>
                  วิศวกรรมซอฟต์แวร์และระบบสารสนเทศ
                </option>
                <option value={"เทคโนโลยีสิ่งแวดล้อมการเกษตร"}>
                  เทคโนโลยีสิ่งแวดล้อมการเกษตร
                </option>
                <option value={"เทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม"}>
                  เทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม
                </option>
                <option value={"สหวิทยาการ"}>สหวิทยาการ</option>
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
      <Toaster />
    </>
  );
}

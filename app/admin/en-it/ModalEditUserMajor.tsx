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
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";

export default function ModalEditUserMajor({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  // console.log(dataProgram?.programs)
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
                <Label htmlFor="name" value="ชื่อสกุล (Full Name)" />
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
                <Label
                  htmlFor="studentId"
                  value="เลขประจำตัวนักศึกษา (Student ID)"
                />
              </div>
              <TextInput
                id="studentId"
                type="text"
                value={payload.studentId}
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
                required
                value={payload.program}
                onChange={(e) =>
                  setPayload({ ...payload, program: e.target.value })
                }
              >
                {dataProgram?.programs.map((item, index) => (
                  <option value={item.name} key={index}>{item.name}</option>
                ))}
              </Select>
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
                value={payload.major}
                onChange={(e) =>
                  setPayload({ ...payload, major: e.target.value })
                }
              >
                <option value={payload.major}>{payload.major}</option>
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
                value={payload.academicYear}
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
                value={payload.phoneNumber}
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
                value={payload.lineId}
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
                value={payload.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                required
                value={payload.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">สถานะการศึกษา</legend>
              <div className="flex items-center gap-2">
                <Radio
                  id="กำลังศึกษา"
                  name="status"
                  value="กำลังศึกษา"
                  checked={payload.status === "กำลังศึกษา"}
                  onChange={(e) =>
                    setPayload({ ...payload, status: e.target.value })
                  }
                />
                <Label htmlFor="กำลังศึกษา">กำลังศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="สำเร็จการศึกษา"
                  name="status"
                  value="สำเร็จการศึกษา"
                  checked={payload.status === "สำเร็จการศึกษา"}
                  onChange={(e) =>
                    setPayload({ ...payload, status: e.target.value })
                  }
                />
                <Label htmlFor="สำเร็จการศึกษา">สำเร็จการศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="พ้นสภาพ"
                  name="status"
                  value="พ้นสภาพ"
                  checked={payload.status === "พ้นสภาพ"}
                  onChange={(e) =>
                    setPayload({ ...payload, status: e.target.value })
                  }
                />
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
                <Textarea
                  id="reason"
                  value={payload.reason}
                  onChange={(e) =>
                    setPayload({ ...payload, reason: e.target.value })
                  }
                />
              </div>
            )}
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

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
// import { useGetAllProgramQuery } from "@/redux/features/program/programApi";
import { useGetAllEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";
import { useGetMajorByIdQuery } from "@/redux/features/major/majorApi";
import { useGetAllSectQuery } from "@/redux/features/sect/sectApi";

export default function ModalEditUserMajor({
  data,
  refetch,
  major,
  program,
}: any) {
  const [openModal, setOpenModal] = useState(false);
  // const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  const payloadSearch = {
    name: "",
    major: major,
    page: 1,
    limit: 1000,
  };

  const { data: dataAllEstablishments, refetch: refetchAllEstablishments } =
    useGetAllEstablishmentsQuery(payloadSearch);
  const { data: dataMajor } = useGetMajorByIdQuery({ id: major });
  const { data: dataSect } = useGetAllSectQuery(undefined, {});

  // console.log(establishment);
  const [payload, setPayload] = useState({
    prefix: data?.prefix,
    id: data?._id,
    name: data?.name,
    email: data?.email,
    program: data?.program?._id,
    academicYear: data?.academicYear,
    reason: data?.reason,
    phoneNumber: data?.phoneNumber,
    lineId: data?.lineId,
    address: data?.address,
    status: data?.status,
    studentId: data?.studentId,
    major: data?.major?._id,
    intern: data?.intern?._id,
    sect: data?.sect?._id,
  });

  const [updateUser, { isLoading, error, isSuccess }] =
    useUpdateUserByIdMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("อัพเดทผู้ใช้สำเร็จ");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("อัพเดทผู้ใช้ไม่สำเร็จ");
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
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>แก้ไขข้อมูลนักศึกษา {data.name}</Modal.Header>
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
                  defaultValue={
                    payload.prefix == "นาย" || payload.prefix == "นางสาว"
                      ? payload.prefix
                      : "others"
                  }
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
                  disabled={
                    payload.prefix == "นาย" || payload.prefix == "นางสาว"
                  }
                  id="prefix"
                  type="text"
                  defaultValue={
                    payload.prefix == "นาย" || payload.prefix == "นางสาว"
                      ? ""
                      : payload.prefix
                  }
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
                value={dataMajor?.data?.program?._id}
                onChange={(e) =>
                  setPayload({ ...payload, program: e.target.value })
                }
              >
                <option value={dataMajor?.data?.program?._id} key={0}>
                  {dataMajor?.data?.program?.name}
                </option>
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
                value={dataMajor?.data?._id}
              >
                <option value={dataMajor?.data?._id} key={0}>
                  {dataMajor?.data?.name}
                </option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="sect" value="ชื่อแขนง" />
              </div>
              <Select
                id="sect"
                defaultValue={payload.sect}
                onChange={(e) =>
                  setPayload({ ...payload, sect: e.target.value })
                }
              >
                <option value="" disabled>
                  เลือกแขนง
                </option>
                {dataSect?.sects
                  ?.filter((item: any) => item.major._id === payload.major)
                  ?.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="intern" value="สถานประกอบการณ์ฝึกงาน" />
              </div>
              <Select
                id="intern"
                onChange={(e) => handleChange(e)}
                value={payload.intern}
              >
                <option value="">ไม่มีสถานประกอบการณ์ฝึกงาน</option>
                {dataAllEstablishments?.establishments?.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
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

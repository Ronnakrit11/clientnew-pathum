"use client";

import { Button, Checkbox, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { Label, TextInput } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { useGetMajorByIdQuery } from "@/redux/features/major/majorApi";
import { Datepicker } from "flowbite-react";
import { FaPlus } from "react-icons/fa6";
import { useCreateTeacherMutation } from "@/redux/features/teacher/teacherApi";
import { HiOutlinePlusSmall } from "react-icons/hi2";

export default function ModalCreateTeacher({ data, refetch, major, id }: any) {
  const [openModal, setOpenModal] = useState(false);

  // const payloadSearch = {
  //   name: "",
  //   major: major,
  //   page: 1,
  //   limit: 1000,
  // };

  const { data: dataMajor } = useGetMajorByIdQuery({ id:major });
  console.log(dataMajor);
  const [selectedTypes, setSelectedTypes] = useState(
    data?.type ? data.type.map((item: any) => item.name) : []
  );

  const [payload, setPayload] = useState({
    prefix: "ศ.",
    name: "",
    sirName: "",
    type: [{ name: "", date: null }],
    phoneNumber: "",
    email: "",
    major: major,
    note: "",
  });
  // console.log(major)
  // console.log(data?.major?._id)
  const [checkboxOptions, setCheckboxOptions] = useState([
    "ผ่านการอบรมหลักสูตรสหกิจศึกษา",
    "ผ่านการอบรมหลักสูตรสหกิจศึกษา (CWIE)",
    "ผ่านการอบรมทั้งหลักสูตรสหกิจศึกษาและสหกิจศึกษา (CWIE)",
  ]);
  const [newOption, setNewOption] = useState("");

  const [createTeacher, { isLoading, error, isSuccess }] =
    useCreateTeacherMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างอาจารย์เรียบร้อยแล้ว");
      refetch();
      setOpenModal(false);
      setPayload({
        prefix: "ศ.",
        name: "",
        sirName: "",
        type: [{ name: "", date: null }],
        phoneNumber: "",
        email: "",
        major: major,
        note: "",
      });
    }
    if (error) {
      toast.error("สร้างอาจารย์ผิดพลาด");
    }
  }, [isSuccess, error, refetch]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    // console.log(payload);
  };

  const handleSubmit = async () => {
    await createTeacher(payload);
  };

  const handleCheckboxChange = (name: string) => {
    setSelectedTypes((prev) => {
      const updatedTypes = prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name];

      // อัปเดตค่า type ใน payload ให้เป็น array ของ object { name: "...", date: "" }
      setPayload((prevPayload) => ({
        ...prevPayload,
        type: updatedTypes.map((type) => ({
          name: type,
          date: prevPayload.type?.find((t) => t.name === type)?.date || null, // เก็บวันที่เดิมถ้ามีอยู่
        })),
      }));

      return updatedTypes;
    });
  };

  const handleDateChange = (date: Date, typeName: string) => {
    setPayload((prevPayload) => ({
      ...prevPayload,
      type: prevPayload.type.map((t) =>
        t.name === typeName ? { ...t, typeDate: date.toISOString() } : t
      ),
    }));
  };

  // console.log(payload);

  const handleAddOption = () => {
    if (newOption.trim() && !checkboxOptions.includes(newOption)) {
      setCheckboxOptions([...checkboxOptions, newOption]);
      setNewOption("");
    } else {
      toast.error("ตัวเลือกนี้มีอยู่แล้วหรือว่างเปล่า");
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        // outline
        // color="warning"
        // size={"sm"}
        className="bg-primary"
      >
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างอาจารย์
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>สร้างอาจารย์</Modal.Header>
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
                  defaultValue={payload.prefix || "others"}
                >
                  <option value="ศ.">ศ.</option>
                  <option value="รศ.">รศ.</option>
                  <option value="ผศ.">ผศ.</option>
                  <option value="ศ.ดร.">ศ.ดร.</option>
                  <option value="รศ.ดร.">รศ.ดร.</option>
                  <option value="ผศ.ดร.">ผศ.ดร.</option>
                  <option value="อ.ดร.">อ.ดร.</option>
                  <option value="อ.">อ.</option>
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
                    payload.prefix == "ศ." ||
                    payload.prefix == "รศ." ||
                    payload.prefix == "ผศ." ||
                    payload.prefix == "ศ.ดร." ||
                    payload.prefix == "รศ.ดร." ||
                    payload.prefix == "ผศ.ดร." ||
                    payload.prefix == "อ.ดร." ||
                    payload.prefix == "อ."
                  }
                  id="prefix"
                  type="text"
                  defaultValue={
                    payload.prefix == "others" ? payload.prefix : ""
                  }
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อจริง (Full Name)" />
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
                <Label htmlFor="sirName" value="นามสกุล (Sir Name)" />
              </div>
              <TextInput
                id="sirName"
                type="text"
                required
                value={payload.sirName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="phoneNumber"
                  value="เบอร์โทรศัพท์ (Phone Number)"
                />
              </div>
              <TextInput
                id="phoneNumber"
                type="text"
                value={payload.phoneNumber}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="program" value="อีเมลล์ (Email)" />
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
                <Label htmlFor="major" value="ชื่อสาขาวิชา (Major)" />
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
            <div className="flex flex-col gap-2">
              <div className="my-2 block">
                <Label htmlFor="type" value="ผ่านการอบรมหลักสูตร" />
              </div>
              {checkboxOptions.map((typeName, index) => (
                <>
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`type-${index}`}
                      checked={selectedTypes.includes(typeName)}
                      onChange={() => handleCheckboxChange(typeName)}
                    />
                    <Label htmlFor={`type-${index}`}>{typeName}</Label>
                  </div>
                  {selectedTypes.includes(typeName) && (
                    <Datepicker
                      id={`datepicker-${index}`}
                      onSelectedDateChanged={(date) =>
                        handleDateChange(date, typeName)
                      }
                    />
                  )}
                </>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <TextInput
                  id="newOption"
                  type="text"
                  placeholder="เพิ่มตัวเลือกใหม่"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button onClick={handleAddOption} size="sm">
                  <FaPlus />
                </Button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit" onClick={handleSubmit} color="success">
              สร้าง
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

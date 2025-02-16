"use client";

import { Button, FileInput, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useCreateMajorMutation } from "@/redux/features/major/majorApi";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";
import { Datepicker } from "flowbite-react";
import { Checkbox } from "flowbite-react";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa6";
import { useCreateCoworkMutation } from "@/redux/features/cowork/coworkApi";

interface Payload {
  name: string;
  type: string;
  address: string;
  country: string;
  initials: string;
  phoneNumber: string;
  email: string;
  website: string;
  mainCoordinator: string;
  posisionCoordinator: string;
  lineIdCoordinator: string;
  phoneNumberCoordinator: string;
  emailCoordinator: string;
  dateStartCoperation: any;
  dateEndCoperation: any;
  detailMOU: string;
  file: string;
  note: string;
  statusCoperation: string;
  typeOfCoperation: string[];
  typeFile: string;
}

export default function ModalCreateComCo({ refetch, refetch_data }: any) {
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  // console.log(userData?.user?._id)
  const [openModal, setOpenModal] = useState(false);

  const [options, setOptions] = useState([
    "การวิจัยร่วม",
    "การฝึกงาน",
    "การแลกเปลี่ยนบุคคากร",
    "การจัดกิจกรรม",
  ]);

  const payloadInitial = {
    name: "",
    type: "หน่วยงานภาครัฐ",
    address: "",
    country: "",
    initials: "",
    phoneNumber: "",
    email: "",
    website: "",
    mainCoordinator: "",
    posisionCoordinator: "",
    lineIdCoordinator: "",
    phoneNumberCoordinator: "",
    emailCoordinator: "",
    dateStartCoperation: dayjs().startOf("day").toISOString(),
    dateEndCoperation: dayjs().add(1, "day").startOf("day").toISOString(),
    detailMOU: "",
    file: "",
    note: "",
    statusCoperation: "กำลังดำเนินการ",
    typeOfCoperation: [],
    typeFile: "MOU",
  };
  useEffect(() => {
    setPayload(payloadInitial);
  }, [dataProgram]);

  const [payload, setPayload] = useState<Payload>({
    name: "",
    type: "",
    address: "",
    country: "",
    initials: "",
    phoneNumber: "",
    email: "",
    website: "",
    mainCoordinator: "",
    posisionCoordinator: "",
    lineIdCoordinator: "",
    phoneNumberCoordinator: "",
    emailCoordinator: "",
    dateStartCoperation: dayjs().startOf("day").toISOString(),
    dateEndCoperation: dayjs().add(1, "day").startOf("day").toISOString(),
    detailMOU: "",
    file: "",
    note: "",
    statusCoperation: "กำลังดำเนินการ",
    typeOfCoperation: [],
    typeFile: "MOU",
  });

  // const [createMajor, { isLoading, error, isSuccess }] =
  //   useCreateMajorMutation();

  const [createCowork, { isLoading, error, isSuccess }] =
    useCreateCoworkMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างความร่วมมือเรียบร้อยแล้ว");
      refetch();
      refetch_data();
      setOpenModal(false);
    }
    if (error) {
      toast.error("สร้างความร่วมมือผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await createCowork(payload);
  };

  const handleDateChange = (date, field) => {
    setPayload({ ...payload, [field]: date.toISOString() });
    console.log(payload);
  };

  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption]);
      setNewOption(""); // Clear the input
    }
  };

  const handleCheckboxChange = (option: string, isChecked: boolean) => {
    if (isChecked) {
      // เพิ่มตัวเลือกลงใน array ถ้ายังไม่มีอยู่
      setPayload((prevPayload: any) => ({
        ...prevPayload,
        typeOfCoperation: [...prevPayload.typeOfCoperation, option],
      }));
    } else {
      // เอาตัวเลือกออกจาก array ถ้ามีอยู่
      setPayload((prevPayload) => ({
        ...prevPayload,
        typeOfCoperation: prevPayload.typeOfCoperation.filter(
          (item) => item !== option
        ),
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString(); // เก็บ Base64 content ทั้งหมด
        if (base64String) {
          setPayload({ ...payload, file: base64String });
        }
      };
      reader.readAsDataURL(file); // อ่านไฟล์แบบ data URL
    } else {
      toast.error("กรุณาเลือกไฟล์ PDF");
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างความร่วมมือหน่วยงาน
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>สร้างความร่วมมือหน่วยงาน</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="ชื่อหน่วยงาน" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="ชื่อเต็มของหน่วยงาน"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="initials" value="ชื่อย่อหน่วยงาน" />
                </div>
                <TextInput
                  id="initials"
                  type="text"
                  placeholder="ชื่อย่อหรือสัญลักษณ์ของหน่วยงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="type" value="ประเภทหน่วยงาน" />
                </div>
                <Select
                  id="type"
                  value={payload.type}
                  onChange={(e) =>
                    setPayload({ ...payload, type: e.target.value })
                  }
                >
                  <option value="" disabled>
                    เลือกประเภทหน่วยงาน
                  </option>
                  <option value="หน่วยงานภาครัฐ">หน่วยงานภาครัฐ</option>
                  <option value="เอกชน">เอกชน</option>
                  <option value="มหาวิทยาลัย">มหาวิทยาลัย</option>
                  <option value="องค์กรระหว่างประเทศ">
                    องค์กรระหว่างประเทศ
                  </option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="address" value="ที่อยู่หน่วยงาน" />
                </div>
                <TextInput
                  id="address"
                  type="text"
                  placeholder="ที่อยู่สำนักงานหลัก"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="country" value="จังหวัด/ประเทศ" />
                </div>
                <TextInput
                  id="country"
                  type="text"
                  placeholder="จังหวัดหรือประเทศที่หน่วยงานตั้งอยู่"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneNumber" value="เบอร์ติดต่อ" />
                </div>
                <TextInput
                  id="phoneNumber"
                  type="text"
                  placeholder="หมายเลขโทรศัพท์ของหน่วยงาน"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="อีเมลล์" />
                </div>
                <TextInput
                  id="email"
                  type="text"
                  placeholder="อีเมลล์กลางสำหรับติดต่อหน่วยงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="website" value="เว็บไซต์" />
                </div>
                <TextInput
                  id="website"
                  type="text"
                  placeholder="URL เว็บไซต์หลักของหน่วยงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="mainCoordinator" value="ผู้ประสานงานหลัก" />
                </div>
                <TextInput
                  id="mainCoordinator"
                  type="text"
                  placeholder="ชื่อบุคคล ที่หน่วยงานความร่วมมือแต่งตั้งให้ดูแลประสานงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="posisionCoordinator"
                    value="ตำแหน่งผู้ประสานงาน"
                  />
                </div>
                <TextInput
                  id="posisionCoordinator"
                  type="text"
                  placeholder="ตำแหน่งผู้ประสานงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="phoneNumberCoordinator"
                    value="เบอร์ติดต่อผู้ประสานงาน"
                  />
                </div>
                <TextInput
                  id="phoneNumberCoordinator"
                  type="text"
                  placeholder="เบอร์โทรศัพท์ของผู้ประสานงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="lineIdCoordinator"
                    value="Line ID ผู้ประสานงาน"
                  />
                </div>
                <TextInput
                  id="lineIdCoordinator"
                  type="text"
                  placeholder="Line ID ของผู้ประสานงาน (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="emailCoordinator"
                    value="อีเมลล์ผู้ประสานงาน"
                  />
                </div>
                <TextInput
                  id="emailCoordinator"
                  type="text"
                  placeholder="อีเมลล์ของบุคคลหน่วยงานคู่ เพื่อใช้ติดต่อโดยตรง (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="dateStartCoperation"
                    value="วันที่เริ่มทำข้อตกลง"
                  />
                </div>
                <Datepicker
                  id="dateStartCoperation"
                  placeholder="วันที่เริ่มทำข้อตกลงความร่วมมือ"
                  required
                  onSelectedDateChanged={(date) =>
                    handleDateChange(date, "dateStartCoperation")
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="dateEndCoperation"
                    value="วันที่สิ้นสุดความร่วมมือ"
                  />
                </div>
                <Datepicker
                  id="dateEndCoperation"
                  placeholder="วันที่เริ่มทำข้อตกลงความร่วมมือ"
                  required
                  onSelectedDateChanged={(date) =>
                    handleDateChange(date, "dateEndCoperation")
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="typeOfCoperation" value="ประเภทความร่วมมือ" />
                </div>
                <div className="flex max-w-md flex-col gap-4" id="checkbox">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Checkbox
                        id={`typeOfCoperation-${index}`}
                        checked={payload.typeOfCoperation.includes(option)}
                        onChange={(e) =>
                          handleCheckboxChange(option, e.target.checked)
                        }
                      />
                      <Label
                        htmlFor={`typeOfCoperation-${index}`}
                        className="ml-2"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                  <div className="flex">
                    <TextInput
                      id="newOption"
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="เพิ่มประเภทความร่วมมือ"
                    />
                    <Button
                      onClick={handleAddOption}
                      className="ml-2"
                      size={"sm"}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="detailMOU" value="รายละเอียดข้อตกลง" />
                </div>
                <Textarea
                  id="detailMOU"
                  // type="text"
                  placeholder="เนื้อหาข้อตกลงหรือ MOU แบบสั้น"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file" value="ไฟล์แนบ" />
                </div>
                <FileInput
                  id="file"
                  placeholder="ไฟล์ PDF หรือเอกสารข้อตกลง (ถ้ามี)"
                  required
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="typeFile" value="ประเภทเอกสารแนบ" />
                </div>
                <Select
                  id="typeFile"
                  value={payload.typeFile}
                  onChange={(e) =>
                    setPayload({ ...payload, typeFile: e.target.value })
                  }
                >
                  <option value="" disabled>
                    เลือกประเภทเอกสารแนบ
                  </option>
                  <option value="MOU">MOU</option>
                  <option value="MOA">MOA</option>
                  <option value="TOR">TOR</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="statusCoperation" value="สถานะการทำงาน" />
                </div>
                <Select
                  id="statusCoperation"
                  value={payload.statusCoperation}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="" disabled>
                    เลือกสถานะความร่วมมือ
                  </option>
                  <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                  <option value="สิ้นสุด">สิ้นสุด</option>
                  <option value="รอต่ออายุ">รอต่ออายุ</option>
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="note" value="หมายเหตุเพิ่มเติม" />
                </div>
                <Textarea
                  id="note"
                  placeholder="ข้อมูลเพิ่มเติมอื่นๆ (ถ้ามี)"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
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

"use client";
import React, { useEffect, useState } from "react";
import { Button, FileInput, Label, TextInput, Select } from "flowbite-react";
import { useUploadThesisMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { Modal } from "flowbite-react";
import { useGetAllEstablishmentsQuery } from "@/redux/features/establishment/establishmentApi";

const UploadThesis = ({ id, refetch }: { id: string; refetch: any }) => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [uploadThesis, { isLoading, isSuccess, error }] =
    useUploadThesisMutation();
  const [openModal, setOpenModal] = useState(false);
  const [advisor1, setAdvisor1] = useState("");
  const [advisor2, setAdvisor2] = useState("");
  const [advisor3, setAdvisor3] = useState("");
  const [title, setTitle] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result?.toString(); // เก็บ Base64 content ทั้งหมด
        if (base64String) {
          setFileBase64(base64String);
        }
      };
      reader.readAsDataURL(file); // อ่านไฟล์แบบ data URL
    } else {
      toast.error("กรุณาเลือกไฟล์ PDF");
    }
  };

  const handleSubmit = async () => {
    if (!fileBase64) {
      toast.error("กรุณาอัพโหลดไฟล์ก่อนส่ง");
      return;
    }

    try {
      // ส่งข้อมูลในรูปแบบที่กำหนด
      await uploadThesis({
        id,
        title,
        file: fileBase64,
        advisor1,
        advisor2,
        advisor3,
      }).unwrap();
      // toast.success("อัพโหลดปริญญานิพนธ์เรียบร้อยแล้ว");
    } catch (err) {
      toast.error("อัพโหลดปริญญานิพนธ์ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("การส่งไฟล์สำเร็จ");
      refetch();
      setOpenModal(false);
    }
    if (error) {
      toast.error("การส่งไฟล์ไม่สำเร็จ");
    }
  }, [isSuccess, error]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)} color="dark">
        อัพโหลดปริญญานิพนธ์
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>อัพโหลดปริญญานิพนธ์</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" value="ชื่อหัวข้อปริญญานิพนธ์" />
              <TextInput
                id="title"
                type="text"
                required
                // onChange={(e) => handleChange(e)}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="advisor"
                value="อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 1"
              />
              <TextInput
                id="advisor"
                type="text"
                required
                // onChange={(e) => handleChange(e)}
                onChange={(e) => setAdvisor1(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="advisor2"
                value="อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 2"
              />
              <TextInput
                id="advisor2"
                type="text"
                required
                // onChange={(e) => handleChange(e)}
                onChange={(e) => setAdvisor2(e.target.value)}
              />
            </div>
            <div>
              <Label
                htmlFor="advisor3"
                value="อาจารย์ที่ปรึกษาปริญญานิพนธ์ คนที่ 3"
              />
              <TextInput
                id="advisor3"
                type="text"
                required
                // onChange={(e) => handleChange(e)}
                onChange={(e) => setAdvisor3(e.target.value)}
              />
            </div>
            <div id="fileUpload" className="flex flex-col gap-2">
              <Label htmlFor="file" value="อัพโหลดไฟล์" />
              <FileInput
                id="file"
                name="file"
                className="file-input"
                onChange={handleFileChange}
                accept="application/pdf"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading} color="dark">
            อัพโหลด
          </Button>{" "}
          <Button color="gray" onClick={() => setOpenModal(false)}>
            ยกเลิก
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadThesis;

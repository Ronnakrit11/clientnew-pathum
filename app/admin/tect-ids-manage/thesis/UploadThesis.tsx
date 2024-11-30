"use client";
import React, { useEffect, useState } from "react";
import { Button, FileInput } from "flowbite-react";
import { useUploadThesisMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

const UploadThesis = ({ id, refetch }: { id: string; refetch: any }) => {
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [uploadThesis, { isLoading, isSuccess, error }] =
    useUploadThesisMutation();

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
      await uploadThesis({ id, file: fileBase64 }).unwrap();
      toast.success("อัพโหลดปริญญานิพนธ์เรียบร้อยแล้ว");
    } catch (err) {
      toast.error("อัพโหลดปริญญานิพนธ์ไม่สำเร็จ");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("การส่งไฟล์สำเร็จ");
      refetch();
    }
    if (error) {
      toast.error("การส่งไฟล์ไม่สำเร็จ");
    }
  }, [isSuccess, error]);

  return (
    <div id="fileUpload" className="max-w-md flex gap-2">
      <FileInput
        id="file"
        name="file"
        className="file-input"
        onChange={handleFileChange}
        accept="application/pdf"
      />
      <Button onClick={handleSubmit} disabled={isLoading} color="dark">
        อัพโหลด
      </Button>
    </div>
  );
};

export default UploadThesis;

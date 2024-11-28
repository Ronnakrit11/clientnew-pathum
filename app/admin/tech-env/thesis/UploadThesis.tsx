"use client";
import React, { useEffect, useState } from "react";
import { FileInput, Label } from "flowbite-react";
import { useUploadThesisMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";

const UploadThesis = ({ id }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePdf, setFilePdf] = useState(null) as any;
  const [uploadThesis, { isLoading, isSuccess, error }] =
    useUploadThesisMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("อัพโหลดปริญญานิพนธ์เรียบร้อยแล้ว");
    }
    if (error) {
      toast.error("อัพโหลดปริญญานิพนธ์ไม่สำเร็จ");
    }
  }, [isSuccess, error]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();

      setFile(selectedFile);
      reader.readAsDataURL(selectedFile);

      await uploadThesis({ file: selectedFile, id });
    }
    console.log(selectedFile);
  };

  const handleFilePDFChange = (e: any) => {
    const file = e.target.files?.[0];
    console.log("🚀 ~ file: page.tsx:28 ~ handleFilePDFChange ~ file:", file);
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          // setEbookInfo({ ...ebookInfo, pdfFile: reader.result });
          setFilePdf(reader.result);
        }
      };
      reader.readAsDataURL(file);

      uploadThesis({ file: reader.result, id });
    }
  };

  return (
    <div id="fileUpload" className="max-w-md">
      <FileInput
        id="file"
        name="file"
        className="file-input"
        onChange={handleFileChange}
        accept="application/pdf"
      />
    </div>
  );
};

export default UploadThesis;

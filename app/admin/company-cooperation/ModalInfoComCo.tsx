"use client";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useUpdateAvatarAdminMutation } from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";

const ModalInfoComco = ({ data, refetch }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarAdminMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("อัพโหลดรูปสำเร็จ");
      refetch();
    }
    if (error) {
      toast.error("อัพโหลดรูปล้มเหลว");
    }
  }, [isSuccess]);
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar({ avatar, id: data?._id });
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size={"sm"}
        color="success"
        outline
      >
        <HiOutlineEye size={20} />
      </Button>
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <p>รายละเอียดหน่วยงานความร่วมมือ</p>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p>ชื่อย่อหน่วยงาน : {data.initials}</p>
            <p>ชื่อหน่วยงาน : {data.name}</p>
            <p>ประเภทหน่วยงาน : {data.type}</p>
            <p>ที่อยู่สำนักงานหลัก : {data.address}</p>
            <p>จังหวัด/ประเทศ : {data.country}</p>
            <p>เบอร์ติดต่อ : {data.phoneNumber}</p>
            <p>อีเมลล์ : {data.email}</p>
            <p>เว็บไซต์ : {data.website}</p>
            <p>ผู้ประสานงานหลัก : {data.mainCoordinator}</p>
            <p>ตำแหน่งผู้ประสานงาน : {data.posisionCoordinator}</p>
            <p>เบอร์ติดต่อผู้ประสานงาน : {data.phoneNumberCoordinator}</p>
            <p>Line ID ผู้ประสานงาน : {data.lineIdCoordinator}</p>
            <p>อีเมลล์ผู้ประสานงาน : {data.emailCoordinator}</p>
            <p>วันที่เริ่มทำข้อตกลง : {data.dateStartCoperation}</p>
            <p>วันที่สิ้นสุดความร่วมมือ : {data.dateEndCoperation}</p>
            <p>ประเภทความร่วมมือ : {data.typeOfCoperation}</p>
            <p>รายละเอียดข้อตกลง : {data.detailMOU}</p>
            <p className="flex gap-2">
              ไฟล์แนบ :
              <Button
                color="dark"
                size="sm"
                href={String(data.file)}
                target="_blank"
              >
                <FaFilePdf />
              </Button>
            </p>
            <p>ประเภทเอกสารแนบ : {data.typeFile}</p>
            <p>สถานะการทำงาน : {data.statusCoperation}</p>
            <p>หมายเหตุเพิ่มเติม : {data.note}</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfoComco;

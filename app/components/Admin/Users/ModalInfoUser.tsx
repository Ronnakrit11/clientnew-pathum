"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";

const ModalInfoUser = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);

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
      <Modal show={isOpen} onClose={() => setIsOpen(false)} className="z-[9999999999999999]">
        <Modal.Header>รายละเอียดนักศึกษา {data.name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              รหัสนักศึกษา : {data.studentId}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ชื่อ-นามสกุล : {data.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              หลักสูตร : {data.program}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              สาขาวิชา : {data.major}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              สถานะการศึกษา : {data.status}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ปีการศึกษา : {data.academicYear}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              อีเมลล์ : {data.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เบอร์โทรศัพท์ : {data.phoneNumber}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Line ID : {data.lineId}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ที่อยู่ : {data.address}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เหตุผลที่พ้นการศึกษา : {data.status === "พ้นสภาพ" && data.reason}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfoUser;

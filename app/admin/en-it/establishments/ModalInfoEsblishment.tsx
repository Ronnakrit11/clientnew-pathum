"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";

const ModalInforEstablishment = ({ data }: any) => {
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
              ชื่อสถานประกอบการ : {data.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ประเภทสถานประกอบการ : {data.category}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              หน่วยงานที่นักศึกษาออกสหกิจ : {data.agency}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ที่ตั้ง : {data.address}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เบอร์สถานประกอบการ : {data.phone_number}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ชื่อพนักงานติดต่อ : {data.name_of_establishment}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              หมายเลขพนักงานติดต่อ : {data.phone_number_of_establishment}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Line ID พนักงานติดต่อ : {data.idLine_of_establishment}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              รายละเอียดเพิ่มเติม : {data.details}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInforEstablishment;

"use client";
import { Badge, Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import dayjs from "dayjs";

const ModalInforTeacher = ({ data }: any) => {
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
      <Modal
        show={isOpen}
        onClose={() => setIsOpen(false)}
        className="z-[9999999999999999]"
      >
        <Modal.Header>
          รายละเอียดอาจารย์ {data.prefix} {data.name} {data.sirName}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ชื่อ-นามสกุล : {data.prefix} {data.name} {data.sirName}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              อีเมลล์ : {data.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เบอร์โทรศัพท์ : {data.phoneNumber}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              สาขาวิชา : {data.major.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ผ่านการอบรม :{" "}
              {data.type.map((item: any) => (
                <>
                  <Card className="mt-2">
                    <div className="flex justify-between">
                      <span>ชื่อหลักสูตร : {item.name}</span>
                      <Badge color="success">ผ่านการอบรม</Badge>
                    </div>
                    <p>
                      วันที่ผ่านการอบรม :{" "}
                      {dayjs(item?.typeDate).format("DD/MM/YYYY")}
                    </p>
                  </Card>
                </>
              ))}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInforTeacher;

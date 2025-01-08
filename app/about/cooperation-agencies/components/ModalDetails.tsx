"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";

export default function ModalDetails({
  openModal,
  setOpenModal,
  item,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  item: any;
}) {
  return (
    <>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>รายชื่อหน่วยงานความร่วมมือ</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ชื่อสถานประกอบการ : {item.name}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ที่อยู่สถานประกอบการ : {item.address}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              ชื่อบุคคลที่สามารถติดต่อได้ : {item.name_of_establishment}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เบอร์โทรศัพท์ติดต่อ : {item.phone_number}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              อีเมลล์ หรือช่องทางติดต่ออื่นๆ : {item.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              หมายเหตุ อื่น ๆ : {item.note}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

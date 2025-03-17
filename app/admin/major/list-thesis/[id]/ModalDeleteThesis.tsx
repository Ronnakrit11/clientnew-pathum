"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";
import { useDeleteMajorMutation } from "@/redux/features/major/majorApi";
import { useDeleteThesisMutation } from "@/redux/features/thesis/thesisApi";
export default function ModalDeleteThesis({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteThesis, { isSuccess, error }] = useDeleteThesisMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      refetch();
      toast.success("ลบข้อมูลปริญญานิพนธิ์เรียบร้อยแล้ว");
    }
    if (error) {
      if ("status" in error && error?.status === 400) {
        setOpenModal(false);
        toast.error("กรุณาลบนักศึกษาที่เกี่ยวข้องกับหลักสูตรนี้");
      }
      // toast.error("ลบข้อมูลนักศึกษาผิดพลาด");
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deleteThesis({ id: data._id });
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        outline
        size={"sm"}
        color="failure"
      >
        <HiOutlineArchiveBoxXMark size={20} />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="z-[9999999999999999]"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              คุณแน่ใจว่าจะลบข้อมูลปริญญานิพนธิ์ {data?.name} หรือไม่ ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete()}>
                ลบข้อมูล
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

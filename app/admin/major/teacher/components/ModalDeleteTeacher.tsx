"use client";

import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { HiOutlineArchiveBoxXMark } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useDeleteTeacherMutation } from "@/redux/features/teacher/teacherApi";

export default function ModalDeleteTeacher({ data, refetch }: any) {
  const [openModal, setOpenModal] = useState(false);
  const [deleteTeacher, { isSuccess, error }] = useDeleteTeacherMutation();

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      refetch();
      toast.success("ลบข้อมูลแอดมินเรียบร้อยแล้ว");
    }
    if (error) {
      toast.error("กรุณาลบสาขาวิชาที่เกี่ยวข้องกับหลักสูตรนี้");
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    await deleteTeacher({ id: data._id });
  };
  //   console.log(data?._id);

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
              คุณแน่ใจว่าจะลบข้อมูลอาจารย์ {data?.prefix} {data?.name}{" "}
              {data?.sirName} หรือไม่ ?
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

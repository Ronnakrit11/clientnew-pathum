"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { useGetAllUserByEstablishmentQuery } from "@/redux/features/establishment/establishmentApi";
const ModalInforEstablishment = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  // console.log(data?._id);
  const { data: userData } = useGetAllUserByEstablishmentQuery(data?._id);

  console.log(userData?.user);
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
        <Modal.Header>รายละเอียดนักศึกษา {data.name}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-[18px]">ที่อยู่ตามสำเนา</p>
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
            <p className="text-[18px]">ที่อยู่ติดต่อ</p>
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
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              อีเมลล์สถานประกอบการ : {data.email}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              หมายเหตุ อื่นๆ : {data.note}
            </p>
          </div>
          <div className="mt-6 space-y-6">
            <p className="text-[18px]">นักศึกษาที่เคยเข้าฝึกงาน</p>
            {userData?.user?.length > 0 ? (
              <>
                {userData?.user?.map((item: any, index: any) => (
                  <>
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {index + 1}. ชื่อ-นามสกุล : {item.prefix} {item.name}{" "}
                      ปีการศึกษา : {item.academicYear}
                    </p>
                  </>
                ))}
              </>
            ) : (
              <>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  ยังไม่มีนักศึกษาที่เคยเข้าฝึกงาน
                </p>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInforEstablishment;

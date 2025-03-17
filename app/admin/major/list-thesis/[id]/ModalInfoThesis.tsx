"use client";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineEye } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa";
import Link from "next/link";

const ModalInfoThesis = ({ data, refetch }: any) => {
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
      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          <p>รายละเอียดปริญญานิพนธิ์ {data.title}</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex w-full divide-x">
            <div className="flex flex-col space-y-4 p-2">
              <div className="space-y-2">
                <p>
                  ชื่อปริญญานิพนธิ์ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.title}
                  </span>
                </p>
                <p className="flex">
                  ไฟล์ Download :{" "}
                  {data?.url ? (
                    <Link href={String(data?.url)} target="_blank">
                      <Button color="dark" size="sm">
                        <FaFilePdf />
                      </Button>
                    </Link>
                  ) : (
                    <></>
                  )}
                </p>
                <p>
                  อาจารย์ที่ปรึกษา :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data?.advisor.map((advisor, index) => (
                      <div key={index}>
                        {index + 1}. {advisor}
                        <br />
                      </div>
                    ))}
                  </span>
                </p>
                <p>
                  สมาชิก :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data?.userId?.map((item, index) => (
                      <div key={index} className="p-2 border mb-2">
                        {index + 1}. {item?.name}
                        <br />
                        แขนง : {item?.sect?.name}
                        <br />
                        สาขาวิชา : {item?.major?.name}
                        <br />
                        หลักสูตร : {item?.program?.name}
                      </div>
                    ))}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer className="flex justify-end">
          <ExportUserPDF data={data} />
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ModalInfoThesis;

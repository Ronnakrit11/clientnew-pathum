"use client";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { HiOutlineEye } from "react-icons/hi2";
import { FaFilePdf } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ExportUserPDF from "./ExportUserPDF";
import { useUpdateAvatarAdminMutation } from "@/redux/features/user/userApi";
import { toast } from "react-hot-toast";

const ModalInfoUser = ({ data, refetch }: any) => {
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
      <Modal show={isOpen} onClose={() => setIsOpen(false)} size={"7xl"}>
        <Modal.Header>
          <p>รายละเอียดนักศึกษา {data.name}</p>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-around  divide-x">
            <div className="flex flex-col space-y-4 p-2">
              <p className="text-lg text-bold">ข้อมูลนักศึกษา</p>
              <div className="flex flex-row space-x-2">
                <div className="relative group w-[200px] h-[200px]">
                  <label
                    htmlFor="avatar"
                    className="cursor-pointer w-full h-full block"
                  >
                    <Image
                      src={
                        data?.avatar
                          ? data?.avatar?.url
                          : "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                      }
                      alt="รูปประจำตัว"
                      width={2000}
                      height={2000}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-8 h-8 text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 16.5v-9m-3 3.75L12 7.5l3 3.75"
                        />
                      </svg>

                      <p className="text-white">อัพโหลดรูปนักศึกษา</p>
                    </div>
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    className="hidden"
                    onChange={imageHandler}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                  />
                </div>

                <div className="space-y-2">
                  <p>
                    รหัสนักศึกษา :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.studentId}
                    </span>
                  </p>
                  <p>
                    ชื่อ-นามสกุล :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.prefix + " " + data.name}
                    </span>
                  </p>
                  <p>
                    ชื่อ-สถานะการศึกษา :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.status}
                    </span>
                  </p>
                  {data.status === "พ้นสภาพ" && (
                    <p>
                      เหตุผลที่พ้นการศึกษา :{" "}
                      <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {data.reason}
                      </span>
                    </p>
                  )}
                  <p>
                    หลักสูตร :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.program?.name}
                    </span>
                  </p>
                  <p>
                    สาขาวิชา :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.major?.name}
                    </span>
                  </p>
                  <p>
                    แขนง :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.sect?.name}
                    </span>
                  </p>
                  <p>
                    ปีการศึกษา :{" "}
                    <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {data.academicYear}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-lg text-semibold">ข้อมูลสำหรับการติดต่อ</p>
              <div className="space-y-2">
                <p>
                  อีเมลล์ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.email}
                  </span>
                </p>
                <p>
                  เบอร์โทรศัพท์ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.phoneNumber}
                  </span>
                </p>
                <p>
                  Line ID :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.lineId}
                  </span>
                </p>
                <p>
                  ที่อยู่ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.address}
                  </span>
                </p>
              </div>
            </div>

            <div className="p-2 space-y-4">
              <p className="text-lg text-semibold">ประวัติการสหกิจศึกษา</p>
              <div className="space-y-2">
                <p>
                  สถานประกอบการณ์ฝึกงาน :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.name}
                  </span>
                </p>
                <p>
                  ประเภทสถานประกอบการ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.category}
                  </span>
                </p>
                <p>
                  หน่วยงานที่นักศึกษาออกสหกิจ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.agency}
                  </span>
                </p>
                <p>
                  เบอร์สถานประกอบการ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.phone_number}
                  </span>
                </p>
                <p>
                  ชื่อพนักงานติดต่อ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.name_of_establishment}
                  </span>
                </p>
                <p>
                  Line ID พนักงานติดต่อ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.idLine_of_establishment}
                  </span>
                </p>
                <p>
                  รายละเอียดเพิ่มเติม :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.details}
                  </span>
                </p>
                <p>
                  หมายเหตุ อื่นๆ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.intern?.note}
                  </span>
                </p>
              </div>
            </div>
            <div className="p-2 space-y-4">
              <p className="text-lg text-semibold">ข้อมูลผลงานโครงงาน</p>
              <div className="space-y-2">
                <p>
                  หัวข้อปริญญานิพนธ์ :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data.thesis?.title}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  ไฟล์ Download :{" "}
                  {data?.thesis?.url ? (
                    <Link href={String(data?.thesis?.url)} target="_blank">
                      <Button color="dark" size="sm">
                        <FaFilePdf />
                      </Button>
                    </Link>
                  ) : (
                    <></>
                  )}
                </p>
                <p>
                  อาจารย์ที่ปรึกษาคนที่ 1 :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data?.thesis?.advisor1}
                  </span>
                </p>
                <p>
                  อาจารย์ที่ปรึกษาคนที่ 2 :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data?.thesis?.advisor2}
                  </span>
                </p>{" "}
                <p>
                  อาจารย์ที่ปรึกษาคนที่ 3 :{" "}
                  <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {data?.thesis?.advisor3}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <ExportUserPDF data={data} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInfoUser;

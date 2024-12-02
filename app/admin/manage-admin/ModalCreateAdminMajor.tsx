"use client";

import { Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useAddUserMutation } from "@/redux/features/user/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Select } from "flowbite-react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useCreateEstablishmentMutation } from "@/redux/features/establishment/establishmentApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateAdminMajorMutation } from "@/redux/features/user/userApi";

export default function ModalCreateAdminMajor({
  refetch,
  append,
  refetch_data,
}: any) {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData,
  } = useLoadUserQuery(undefined, {});
  console.log(userData?.user?._id);
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_admin: userData?.user?._id,
  });

  console.log(payload);

  const [createAdminMajor, { isLoading, error, isSuccess }] =
    useCreateAdminMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างบัญชีแอดมินเรียบร้อยแล้ว");
      refetch();
      refetch_data();
      setOpenModal(false);
    }
    if (error) {
      toast.error("สร้างบัญชีแอดมินผิดพลาด");
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    console.log(payload);
  };

  const handleSubmit = async () => {
    await createAdminMajor(payload);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} disabled={append <= 0} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างบัญชีแอดมิน
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>สร้างบัญชีแอดมิน</Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อบัญชีแอดมิน" />
              </div>
              <TextInput
                id="name"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="อีเมล์บัญชีแอดมิน" />
              </div>
              <TextInput
                id="email"
                type="email"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="รหัสผ่าน" />
              </div>
              <TextInput
                id="password"
                type="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password_confirm" value="รหัสผ่านอีกครั้ง" />
              </div>
              <TextInput
                id="password_confirm"
                type="password"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div>
              <Label htmlFor="role" value="ตำแหน่ง" />
              <Select
                id="role"
                required
                onChange={(e) =>
                  setPayload({ ...payload, role: e.target.value })
                }
                // value={user.role}
                // onChange={(e) => handleChangeRole(e, user.email)}
                // disabled={true}
              >
                <option value={"user"}>นักศึกษา</option>
                <option value={"admin"}>แอดมิน (Super Admin)</option>
                <option value={"admin-engineer-it"}>
                  แอดมินวิศวกรรมซอฟต์แวร์...
                </option>
                <option value={"admin-tect-env"}>
                  แอดมินเทคโนโลยีสิ่งแวดล้อม...
                </option>
                <option value={"admin-tech-indrustry"}>
                  แอดมินเทคโนโลยีอุตสาหกรรม...
                </option>
                <option value={"interdisciplinary"}>สหวิทยาการ</option>
              </Select>
            </div>
          </Modal.Body>
          <Modal.Footer className="flex justify-end">
            <Button type="submit" onClick={handleSubmit}>
              เพิ่ม
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <Toaster />
    </>
  );
}

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
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { Badge } from "flowbite-react";

export default function ModalCreateAdminMajor({
  refetch,
  // append,
  refetch_data,
}: any) {
  const {
    data: userData,
    isLoading: isLoadingUserData,
    refetch: refetchUserData,
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });

  // console.log(userData?.user?.appoint.engineerIT);
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    id_admin: userData?.user?._id,
  });
  const { data: majorData } = useGetAllMajorQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (majorData?.data?.length > 0) {
      setPayload((prev) => ({
        ...prev,
        role: `แอดมิน-${majorData.data[0].name}`,
      }));
    }
  }, [majorData]);

  // console.log(payload);

  const [createAdminMajor, { isLoading, error, isSuccess }] =
    useCreateAdminMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างบัญชีแอดมินเรียบร้อยแล้ว");
      refetch();
      // refetch_data();
      refetchUserData();
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
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างบัญชีแอดมิน
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          className="z-[9999999999999999]"
        >
          <Modal.Header>
            สร้างบัญชีแอดมิน
            <div className="text-[14px] ">
              <h2>สิทธิในการสร้างบัญชีแอดมินของคุณ</h2>
              <p className="flex items-center gap-2">
                สาขาวิชาวิศวกรรมซอฟต์แวร์และระบบสารสนเทศ{" "}
                <Badge
                  color={
                    userData?.user?.appoint.engineerIT > 0
                      ? "success"
                      : "failure"
                  }
                >
                  {userData?.user?.appoint.engineerIT}
                </Badge>
                ครั้ง
              </p>
              <p className="flex items-center gap-2">
                สาขาวิชาเทคโนโลยีสิ่งแวดล้อมการเกษตร{" "}
                <Badge
                  color={
                    userData?.user?.appoint.argTech > 0 ? "success" : "failure"
                  }
                >
                  {userData?.user?.appoint.argTech}
                </Badge>{" "}
                ครั้ง
              </p>
              <p className="flex items-center gap-2">
                สาขาวิชาเทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม{" "}
                <Badge
                  color={
                    userData?.user?.appoint.techInnovation > 0
                      ? "success"
                      : "failure"
                  }
                >
                  {userData?.user?.appoint.techInnovation}
                </Badge>
                ครั้ง
              </p>
              <p className="flex items-center gap-2">
                สาขาวิชาสหวิทยาการ
                <Badge
                  color={
                    userData?.user?.appoint.interdisciplinary > 0
                      ? "success"
                      : "failure"
                  }
                >
                  {userData?.user?.appoint.interdisciplinary}
                </Badge>{" "}
                ครั้ง
              </p>
            </div>
          </Modal.Header>
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
                value={payload.role}
              >
                {userData?.user?.role === "admin" && (
                  <option value={"admin"}>admin</option>
                )}
                {majorData?.data?.map((major) => (
                  <option key={major._id} value={`แอดมิน-${major.name}`}>
                    แอดมิน-{major.name}
                  </option>
                ))}
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

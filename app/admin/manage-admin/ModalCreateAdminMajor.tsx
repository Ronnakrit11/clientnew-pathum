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
import { useCreateAdminMajorMutation } from "@/redux/features/user/userApi";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { Badge } from "flowbite-react";
import { z } from "zod";
import { useAppointAdminCreateQuery } from "@/redux/features/user/userApi";
import { useGetAppointByIdQuery } from "@/redux/features/user/userApi";
import { useSelector } from "react-redux";
const payloadSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirm: z.string().min(8),
    role: z.string().min(3),
    // id_admin: z.string().min(3),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ["password_confirm"],
  });

export default function ModalCreateAdminMajor({
  refetch,
  admin_id,
  refetch_data,
}: any) {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  console.log(admin_id);
  const [openModal, setOpenModal] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
    role: "",
  });



  const { data: appointData, refetch: refetchDataAppoint } =
    useGetAppointByIdQuery(
      {
        id: admin_id,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );
  // console.log(appointData?.data?.appoint);

  const {
    data: dataAppointAdminCreate,
    refetch: refetchDataAppointAdminCreate,
  } = useAppointAdminCreateQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  // console.log(appointAdminCreate);

  const { data: majorData, refetch: recethData } = useGetAllMajorQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  // console.log(payload);

  useEffect(() => {
    if (majorData?.data?.length > 0) {
      setPayload((prev) => ({
        ...prev,
        role: `admin-${majorData.data[0]._id}`,
      }));
    }
  }, [majorData]);

  useEffect(() => {
    if (dataAppointAdminCreate) {
      console.log(dataAppointAdminCreate?.majorDetails);
    }
  }, [dataAppointAdminCreate, majorData]);

  const [createAdminMajor, { isLoading, error, isSuccess }] =
    useCreateAdminMajorMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("สร้างบัญชีแอดมินเรียบร้อยแล้ว");
      refetch();
      // recethData();
      // refetchUserData();
      refetch_data();
      refetchDataAppoint()
      refetchDataAppointAdminCreate();
      setOpenModal(false);
    }
    if (error) {
      toast.error(
        "สร้างบัญชีแอดมินผิดพลาด กรุณาตรวจสอบสิทธิ์ในการสร้างบัญชีแอดมิน"
      );
    }
  }, [error, isSuccess]);

  const handleChange = (e: any) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
    // console.log(payload);
  };

  const handleSubmit = async () => {
    try {
      payloadSchema.parse(payload);
      await createAdminMajor(payload);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      }
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-primary">
        <HiOutlinePlusSmall className="mr-2" size={20} />
        สร้างบัญชีแอดมิน
      </Button>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            สร้างบัญชีแอดมิน
            <div className="text-[14px] ">
              <h2>สิทธิในการสร้างบัญชีแอดมินของคุณ</h2>
              {appointData?.data?.appoint &&
                Object.entries(appointData.data.appoint).map(
                  ([key, value]: [string, any]) => {
                    const major = majorData?.data?.find(
                      (major: any) => major._id === key
                    );

                    // แสดงเฉพาะเมื่อพบ major ที่ตรงกัน
                    if (major) {
                      return (
                        <div key={key}>
                          <p className="flex items-center gap-2">
                            <span className="font-medium">{major.name}:</span>{" "}
                            <Badge color={value > 0 ? "success" : "failure"}>
                              {value}
                            </Badge>
                            ครั้ง
                          </p>
                        </div>
                      );
                    }
                    return null; // ไม่แสดงถ้าไม่มี major ที่ตรงกับ id
                  }
                )}
              {/* {appointData?.data?.appoint?.map((item: any) => (
                  <div key={item._id}>
                    <p className="flex items-center gap-2">
                      {item.name}
                      <Badge color={item.item > 0 ? "success" : "failure"}>
                        {item.item}
                      </Badge>
                      ครั้ง
                    </p>
                  </div>
                ))} */}
            </div>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="ชื่อบัญชีแอดมิน" />
              </div>
              <TextInput
                id="name"
                color={errors.name ? "failure" : "default"}
                helperText={errors.name}
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
                color={errors.email ? "failure" : "default"}
                helperText={errors.email}
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
                <option value={"admin"}>superadmin</option>
                {majorData?.data?.map((major) => (
                  <option key={major._id} value={`admin-${major._id}`}>
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
      <div>
        <Toaster />
      </div>
    </>
  );
}

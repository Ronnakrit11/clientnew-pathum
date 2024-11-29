import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  if (user) {
    const isAdmin =
      user?.role === "admin" ||
      user?.role === "วิศวกรรมซอฟต์แวร์และระบบสารสนเทศ" ||
      user?.role === "เทคโนโลยีสิ่งแวดล้อมการเกษตร" ||
      user?.role === "สหวิทยาการ" ||
      user?.role === "เทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม";
    // console.log("user", isAdmin);

    return isAdmin ? children : redirect("/");
  }
}

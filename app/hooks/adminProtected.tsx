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
      user?.role === "แอดมิน-สาขาวิชาสหวิทยาการ" ||
      user?.role === "แอดมิน-สาขาวิชาวิศวกรรมซอฟต์แวร์และระบบสารสนเทศ" ||
      user?.role === "แอดมิน-สาขาวิชาเทคโนโลยีสิ่งแวดล้อมการเกษตร" ||
      user?.role === "แอดมิน-สาขาวิชาเทคโนโลยีอุตสาหกรรมและการจัดการนวัตกรรม"
    // console.log("user", isAdmin);

    return isAdmin ? children : redirect("/");
  }
}

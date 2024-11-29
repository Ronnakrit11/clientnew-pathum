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
      user?.role === "admin-engineer-it" ||
      user?.role === "admin-tect-env" ||
      user?.role === "admin-interdisciplinary" ||
      user?.role === "admin-tect-ids-manage"
    // console.log("user", isAdmin);

    return isAdmin ? children : redirect("/");
  }
}

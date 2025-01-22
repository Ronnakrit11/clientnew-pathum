import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";

interface ProtectedProps {
  children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useGetAllMajorQuery({});

  const dataMajorById = data?.data?.map((item: any) => "admin-" + item._id);
  // console.log(dataMajorById);
  if (user) {
    const isAdmin =
      user?.role === "admin" || dataMajorById?.includes(user?.role);

    // console.log("user", isAdmin);

    return isAdmin ? children : redirect("/");
  }

  return null; // Return null if there's no user (handle the case where the user is not authenticated)
}
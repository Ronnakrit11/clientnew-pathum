"use client";
import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { Textarea, Label, Button } from "flowbite-react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Editor from "@/app/components/Editor";

const Objective = () => {
  const { data } = useGetHeroDataQuery("Objective");
  const [editLayout, { isLoading, error, isSuccess }] = useEditLayoutMutation();
  // console.log(data?.layout?.objective?.content);
  const payloadInitial = {
    content: data?.layout?.objective?.content || "",
    // objective: data?.layout?.objective?.objective || [],
  };
  const [payload, setPayload] = useState(payloadInitial);
  console.log(payload);
  useEffect(() => {
    setPayload(payloadInitial);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(
        "อัพเดทวัตถุประสงค์และความสำคัญของสโมสรนักศึกษาและระบบฐานข้อมูลนักศึกษาสำเร็จ"
      );
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const handleSave = async () => {
    // console.log(payload);
    await editLayout({ ...payload, type: "Objective" });
  };

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex flex-col justify-between items-center mb-4 space-y-4">
        <h1 className="text-2xl font-bold mb-10">
          วัตถุประสงค์และความสำคัญของสโมสรนักศึกษาและระบบฐานข้อมูลนักศึกษา
        </h1>
        <div className="w-full">
          <Editor setPropsContent={(data => setPayload({...payload, content: data}))}  defaultContent={payload.content}/>
        </div>
        <div>
          <Button color="success" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Objective;

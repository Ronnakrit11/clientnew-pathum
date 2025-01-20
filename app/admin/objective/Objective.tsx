"use client";
import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { Textarea, Label, Button } from "flowbite-react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const Objective = () => {
  const { data } = useGetHeroDataQuery("Objective");
  const [editLayout, { isLoading, error, isSuccess }] = useEditLayoutMutation();

  const payloadInitial = {
    importance: data?.layout?.objective?.importance || "",
    objective: data?.layout?.objective?.objective || [],
  };
  const [payload, setPayload] = useState(payloadInitial);

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
    console.log(payload);
    await editLayout({ ...payload, type: "Objective" });
  };

  const handleAddObjective = () => {
    setPayload({
      ...payload,
      objective: [...payload.objective, ""],
    });
  };

  const handleRemoveObjective = (index: number) => {
    setPayload({
      ...payload,
      objective: payload.objective.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex flex-col justify-between items-center mb-4 space-y-4">
        <h1 className="text-2xl font-bold mb-10">
          วัตถุประสงค์และความสำคัญของสโมสรนักศึกษาและระบบฐานข้อมูลนักศึกษา
        </h1>
        <div className="w-full">
          <div className="mb-2 block">
            <Label
              htmlFor="importance"
              value="ความสำคัญของการมีสโมสรนักศึกษา"
              className="text-2xl"
            />
          </div>
          <Textarea
            id="importance"
            value={payload.importance}
            onChange={(e) =>
              setPayload({ ...payload, importance: e.target.value })
            }
            rows={10}
          />
        </div>
        <div className="w-full">
          <div className="mb-2 block">
            <Label
              htmlFor="objective"
              value="วัตถุประสงค์ของการมีสโมสรนักศึกษา"
              className="text-2xl"
            />
          </div>
          {payload?.objective?.map((item: string, idx: number) => (
            <div key={idx} className="mb-4 flex items-center space-x-4">
              <Textarea
                id={`objective-${idx}`}
                value={item}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    objective: payload.objective.map((obj, index) =>
                      index === idx ? e.target.value : obj
                    ),
                  })
                }
                rows={5}
              />
              <Button
                color="failure"
                onClick={() => handleRemoveObjective(idx)}
              >
                <FaTrash />
              </Button>
            </div>
          ))}
          <div className="flex justify-end">
            <Button
              color="success"
              onClick={handleAddObjective}
              className="mt-4"
            >
              <FaPlus />
            </Button>
          </div>
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

"use client";
import React, { useEffect, useState, useRef } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useEditLayoutMutation } from "@/redux/features/layout/layoutApi";
import { Textarea, Label, Button, TextInput, Card } from "flowbite-react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineCamera } from "react-icons/ai";
import Editor from "@/app/components/Editor";

const Consult: React.FC = () => {
  const { data } = useGetHeroDataQuery("ConsultSmo");
  const [editLayout, { isLoading, error, isSuccess }] = useEditLayoutMutation();
  const [imageList, setImageList] = useState([]);
  const inputFileElement: any = useRef(null);

  const payloadInitial = {
    // importance: data?.layout?.consultSmo?.importance || [],
    // objective: data?.layout?.consultSmo?.objective || [],
    content: data?.layout?.consultSmo?.content || "",
    consultant: imageList,
  };

  const [payload, setPayload] = useState(payloadInitial);
  useEffect(() => {
    setPayload(payloadInitial);

    if (data?.layout?.consultSmo?.consult?.length) {
      setImageList(data.layout.consultSmo.consult);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("อัพเดทโครงสร้างที่ปรึกษาสโมสรนักศึกษาสำเร็จ");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const handleSave = async () => {
    await editLayout({
      content: payload.content,
      consultant: imageList,
      type: "ConsultSmo",
    });
  };

  const addImages = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrls: any = [...imageList];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          newImageUrls.push({
            img_url: URL.createObjectURL(file),
            file: e.target.result,
            name: "",
            role: "",
          });
          setImageList(newImageUrls);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelImage = (idx: number) => {
    setImageList(imageList.filter((_, index) => index !== idx));
  };

  const handleUpdateField = (idx: number, field: string, value: string) => {
    const updatedList: any = imageList.map((item: any, index: number) =>
      index === idx ? { ...item, [field]: value } : item
    );
    setImageList(updatedList);
  };

  return (
    <div className="container mx-auto mt-24 p-4">
      <div className="flex flex-col justify-between items-center mb-4 space-y-4">
        <h1 className="text-2xl font-bold mb-10">
          โครงสร้างที่ปรึกษาสโมสรนักศึกษา
        </h1>
        <div className="w-full">
          <Editor setPropsContent={(data => setPayload({...payload, content: data}))}  defaultContent={payload.content}/>
        </div>

        <div className="mb-2 block mt-10">
          <Label
            htmlFor="objective"
            value="รายชื่อที่ปรึกษาสโมสรนักศึกษา"
            className="text-2xl"
          />
        </div>
        <div className="flex flex-row gap-2 p-10">
          {imageList.map((ele: any, idx) => {
            return (
              <Card className="flex flex-row" key={idx}>
                <div className="flex flex-col">
                  <img
                    src={ele.img_url || ele.url}
                    alt="not fount"
                    width={"250px"}
                    className="w-[250px] h-[250px]"
                  />
                  <div
                    onClick={() => handleDelImage(idx)}
                    className="w-full text-center text-black bg-gray-200 cursor-pointer flex items-center justify-center py-2 hover:bg-gray-500 hover:text-white"
                  >
                    <RiDeleteBin5Line />
                    Delete
                  </div>
                </div>
                <div>
                  <Label htmlFor={`name-${idx}`} value="ชื่อ" />
                  <TextInput
                    id={`name-${idx}`}
                    type="text"
                    name="name"
                    value={ele.name}
                    onChange={(e) =>
                      handleUpdateField(idx, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`role-${idx}`} value="ตำแหน่ง" />
                  <TextInput
                    id={`role-${idx}`}
                    type="text"
                    name="role"
                    value={ele.role}
                    onChange={(e) =>
                      handleUpdateField(idx, "role", e.target.value)
                    }
                  />
                </div>
              </Card>
            );
          })}
        </div>
        <div>
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            ref={inputFileElement}
            onChange={addImages}
            className="hidden"
          />

          <Button
            onClick={() => inputFileElement.current?.click?.()}
            className=" flex justify-center items-center bg-primary text-white"
          >
            <AiOutlineCamera className=" text-[40px] cursor-pointer " />
            <span> Add Slide Images</span>
          </Button>
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

export default Consult;

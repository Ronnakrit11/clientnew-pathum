import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { Button, Card } from "flowbite-react";

import { RiDeleteBin5Line } from "react-icons/ri";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const inputFileElement: any = useRef(null);

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);

      if (data?.layout?.banner?.image?.length) {
        setImageList(data?.layout?.banner?.image || []);
      }
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Hero updated successfully!");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);

          const newImageUrls: any = [];
          newImageUrls.push(URL.createObjectURL(e.target.result));
          setImageList(newImageUrls);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
      imageList,
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
          });
          setImageList(newImageUrls);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelImage = (idx) => {
    let newImageList = [];

    for (let index in imageList) {
      let ele = imageList[index];

      if (idx != index) {
        newImageList.push(ele);
      }
    }

    setImageList(newImageList);
  };

  console.log(data)
  console.log(imageList)

  return (
    <>
      <div className="w-full flex items-center justify-center mt-40 p-4">
        <div className="1000px:w-[80%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
          <Card>
            <div className="flex gap-2 flex-wrap p-10">
              {imageList.map((ele: any, idx) => {
                return (
                  <div className="flex flex-col" key={idx}>
                    <img
                      src={ele.img_url || ele.url}
                      alt="not fount"
                      width={"250px"}
                    />
                    <div
                      onClick={() => handleDelImage(idx)}
                      className="w-full text-center text-black bg-gray-200 cursor-pointer flex items-center justify-center py-2 hover:bg-gray-500 hover:text-white"
                    >
                      <RiDeleteBin5Line />
                      Delete
                    </div>
                  </div>
                );
              })}
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
            <br />
            <Button className={`bg-primary`} onClick={handleEdit}>
              Save
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EditHero;

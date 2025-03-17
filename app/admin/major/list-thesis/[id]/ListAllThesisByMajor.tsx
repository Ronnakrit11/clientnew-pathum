import React from "react";
import { useParams } from "next/navigation";
import { useGetThesisByIdQuery } from "@/redux/features/thesis/thesisApi";
import { Button, Label, Table, TextInput } from "flowbite-react";

const ListAllThesisByMajor = () => {
  const { id }: any = useParams();
  const { data } = useGetThesisByIdQuery({ id });
  console.log(data?.thesis);
  return (
    <>
      <div className="container mx-auto mt-24 p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Label htmlFor="name" value="ค้นหาปริญญานิพนธิ์" />
            <TextInput
              id="name"
              type="text"
              className="w-[400px]"
              placeholder="กรุณากรอกชื่อปริญญานิพนธิ์ที่จะค้นหา"
            />
          </div>
        </div>
        <Table hoverable>
          <Table.Head className="text-md">
            <Table.HeadCell>ลำดับ</Table.HeadCell>
            <Table.HeadCell>หัวข้อเรื่อง</Table.HeadCell>
            <Table.HeadCell>ไฟล์</Table.HeadCell>
            <Table.HeadCell>สมาชิก</Table.HeadCell>
            <Table.HeadCell>ที่ปรึกษา</Table.HeadCell>
            <Table.HeadCell>แอ็กชัน</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.thesis?.map((item: any, index: any) => (
              <Table.Row key={item?._id}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.title}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <a
                    href={item?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-red-600"
                  >
                    {item?.title}
                  </a>
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.userId?.map((item: any, index: any) => (
                    <div key={index}>
                      {" "}
                      {index + 1}. {item?.name}
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {item?.advisor.map((item: any, index: any) => (
                    <div key={index}>
                      {" "}
                      {index + 1}. {item}
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button>
                    ดำเนินการ
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ListAllThesisByMajor;

import { useGetAllLogsQuery } from "@/redux/features/logs/logsApi";
import { Alert, Card, Select } from "flowbite-react";
import { Badge } from "flowbite-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Datepicker } from "flowbite-react";
import { useGetAllAdminLogsQuery } from "@/redux/features/logs/logsApi";
import { useState } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

const AllLogs = () => {
  const today = dayjs().startOf("day").toISOString(); // วันนี้ เวลา 00:00
  const tomorrow = dayjs().add(1, "day").startOf("day").toISOString(); // พรุ่งนี้ เวลา 00:00
  // console.log(today)
  // console.log(tomorrow)
  const [id, setId] = useState("");
  const [startDate, setStartDate] = useState<string | null>(today);
  const [endDate, setEndDate] = useState<string | null>(tomorrow);
  const { data, isLoading } = useGetAllLogsQuery(
    { id,startDate, endDate },
    { refetchOnMountOrArgChange: true }
  );
  const { data: dataAdmin, isLoading: isLoadingAdmin } =
    useGetAllAdminLogsQuery(undefined, {});


  return (
    <div className="">
      <div className="container mx-auto  pt-40">
        <Card className="mb-10">
          <div className="space-y-2">
            <div className="flex gap-2">
              <div>
                <p>ตั้งแต่</p>
                <Datepicker language="th" labelTodayButton="วันนี้" labelClearButton="ล้าง" onSelectedDateChanged={(date) => setStartDate(date?.toISOString() || null)} />
              </div>
              <div>
                <p>ถึง</p>
                <Datepicker language="th" labelTodayButton="วันนี้" labelClearButton="ล้าง" onSelectedDateChanged={(date) => setEndDate(date?.toISOString() || null)} />
              </div>
              <div>
                <p>ค้นหาแอดมิน</p>
                <Select value={id} onChange={(e) => setId(e.target.value)} className="w-[700px]">
                  <option value={""}>ทั้งหมด</option>
                  {dataAdmin?.result.map((item: any, index: number) => (
                    <option key={index} value={item._id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </Card>
        <div className={"space-y-4 w-full flex-col"}>
          {data?.logs.map((item: any, index: number) => (
            <div key={index}>
              <Alert
                color={item.status === "success" ? "success" : "failure"}
                className="w-full sapce-y-4"
                title={item.title}
              >
                <span className=" text-[22px] font-[600] mb-4">
                  {item.title}
                </span>{" "}
                <br />
                รายละเอียด​ : {item.description}
                <p>IP : {item.ip}</p>
                <div className="flex justify-between mt-8">
                  {item.create_by && (
                    <Badge color="success" className="mr-2">
                      ชื่อ : {item.create_by.name}
                    </Badge>
                  )}
                  <Badge color="warning" className="mr-2">
                    เวลา:{" "}
                    {dayjs(item.createdAt)
                      .tz("Asia/Bangkok")
                      .format("HH:mm น. DD/MM/YYYY")}{" "}
                  </Badge>
                </div>
              </Alert>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLogs;

import { useGetAllLogsQuery } from "@/redux/features/logs/logsApi";
import { Alert, Card, Select } from "flowbite-react";
import { Badge, Button } from "flowbite-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Datepicker } from "flowbite-react";
import { useGetAllAdminLogsQuery } from "@/redux/features/logs/logsApi";
import { useState } from "react";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";

dayjs.extend(utc);
dayjs.extend(timezone);

const AllLogs = () => {
  const today = dayjs().startOf("day").toISOString(); // Today at 00:00
  const tomorrow = dayjs().add(1, "day").startOf("day").toISOString(); // Tomorrow at 00:00

  const [id, setId] = useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(today);
  const [endDate, setEndDate] = useState<string | null>(tomorrow);

  const { data, isLoading } = useGetAllLogsQuery(
    { id, startDate, endDate },
    { refetchOnMountOrArgChange: true }
  );
  const { data: dataAdmin, isLoading: isLoadingAdmin } =
    useGetAllAdminLogsQuery(undefined, {});

  const convertToCSV = (data: any[]) => {
    const headers = [
      "ลำดับ",
      "หัวข้อ",
      "สถานะ",
      // "รายละเอียด",
      "IP Address",
      "ชื่อที่ทำรายการ",
      "เวลา",
    ];
    const rows = data?.map((log, index) => [
      index + 1,
      log.title || "-",
      log.status || "-",
      // JSON.stringify(log.description) || "-", // แปลง JSON เป็นข้อความ
      log.ip || "-",
      log.create_by?.name || "-",
      dayjs(log.createdAt).tz("Asia/Bangkok").format("HH:mm น. DD/MM/YYYY"),
    ]);
    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = () => {
    if (data?.logs?.length > 0) {
      const csvContent = convertToCSV(data.logs);
      const bom = "\uFEFF"; // Support for Thai characters
      const blob = new Blob([bom + csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "logs.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("ไม่มีข้อมูลสำหรับดาวน์โหลด");
    }
  };

  return (
    <div className="container mx-auto pt-40">
      <div className="flex justify-end mb-4">
        <Button
          color="success"
          className="flex items-center gap-2"
          onClick={downloadCSV}
          disabled={!data?.logs || data.logs.length === 0}
        >
          <FaFileExcel size={20} className="mr-2" />
          Export Excel (CSV)
        </Button>
      </div>
      <Card className="mb-10">
        <div className="space-y-2">
          <div className="flex gap-2">
            <div>
              <p>ตั้งแต่</p>
              <Datepicker
                language="th"
                labelTodayButton="วันนี้"
                labelClearButton="ล้าง"
                onSelectedDateChanged={(date) =>
                  setStartDate(date?.toISOString() || null)
                }
              />
            </div>
            <div>
              <p>ถึง</p>
              <Datepicker
                language="th"
                labelTodayButton="วันนี้"
                labelClearButton="ล้าง"
                onSelectedDateChanged={(date) =>
                  setEndDate(date?.toISOString() || null)
                }
              />
            </div>
            <div>
              <p>ค้นหาแอดมิน</p>
              <Select
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-[700px]"
              >
                <option value="">ทั้งหมด</option>
                {dataAdmin?.result.map((item: any, index: number) => (
                  <option key={item._id || index} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </Card>
      <div className="space-y-4 w-full flex-col">
        {isLoading ? (
          <p>กำลังโหลดข้อมูล...</p>
        ) : data?.logs?.length > 0 ? (
          data.logs.map((log: any, index: number) => (
            <Alert
              key={log._id || index}
              color={log.status === "success" ? "success" : "failure"}
              className="w-full space-y-4"
              title={log.title}
            >
              <span className="text-[22px] font-[600] mb-4">{log.title}</span>
              <br />
              รายละเอียด​ : {log.description}
              <p>IP : {log.ip}</p>
              <div className="flex justify-between mt-8">
                {log.create_by && (
                  <Badge color="success" className="mr-2">
                    ชื่อ : {log.create_by.name}
                  </Badge>
                )}
                <Badge color="warning" className="mr-2">
                  เวลา:{" "}
                  {dayjs(log.createdAt)
                    .tz("Asia/Bangkok")
                    .format("HH:mm น. DD/MM/YYYY")}
                </Badge>
              </div>
            </Alert>
          ))
        ) : (
          <p>ไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
};

export default AllLogs;

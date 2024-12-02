import { useGetAllLogsQuery } from "@/redux/features/logs/logsApi";
import { Alert } from "flowbite-react";
import { Badge } from "flowbite-react";
import dayjs from "dayjs";

const AllLogs = () => {
  const { data, isLoading } = useGetAllLogsQuery(undefined, {});
  console.log(data?.logs);
  return (
    <div className="container mx-auto  mt-40">
      <div className={"space-y-4 w-full flex-col"}>
        {data?.logs.map((item: any, index: number) => (
          <div key={index}>
            <Alert
              //   color="success"
              color={item.status === "success" ? "success" : "failure"}
              className="w-full"
              title={item.title}
              //   description={item.description}
            >
              <span className="font-medium">{item.title}</span> <br />
              {item.description}
              <p>IP : {item.ip}</p>
              <div className="flex justify-between mt-8">
                {item.create_by && (
                  <Badge color="success" className="mr-2">
                    ชื่อ : {item.create_by.name}
                  </Badge>
                )}
                <Badge color="warning" className="mr-2">
                  เวลา : {dayjs(item.createdAt).format("mm:hh DD/MM/YYYY")}
                </Badge>
              </div>
            </Alert>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLogs;

import React from "react";
import { Drawer, ButtonToolbar } from "rsuite";
import { Button } from "flowbite-react";
import { Label, Checkbox, Radio } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { useGetAllMajorQuery } from "@/redux/features/major/majorApi";
import { useGetAllSectQuery } from "@/redux/features/sect/sectApi";
import { useGetAllProgramQuery } from "@/redux/features/program/programApi";
import { useGetAllSecAllQuery } from "@/redux/features/sect/sectApi";

interface Props {
  setPayload: any;
  payload: any;
  filter?: any;
  setFilter?: any;
}
const DrawerFilter = ({ setPayload, payload, filter, setFilter }: Props) => {
  const [open, setOpen] = React.useState(false);
  const { data: dataMajor } = useGetAllMajorQuery(undefined, {});
  const { data: dataSect } = useGetAllSectQuery(undefined, {});
  const { data: dataProgram } = useGetAllProgramQuery(undefined, {});
  const { data: dataSectAll } = useGetAllSecAllQuery(undefined, {});
  return (
    <div>
      <ButtonToolbar>
        <Button color="failure" onClick={() => setOpen(true)}>
          Filter
        </Button>
      </ButtonToolbar>

      <Drawer open={open} onClose={() => setOpen(false)}>
        <Drawer.Body className="space-y-8">
          <form>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              onChange={(e: any) =>
                setPayload({ ...payload, status: e.target.value })
              }
            >
              <legend className="mb-4">สถานะ</legend>
              <div className="flex items-center gap-2">
                <Radio id="all" name="status" value="" defaultChecked />
                <Label htmlFor="all">ทั้งหมด</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="interest" name="status" value="กำลังศึกษา" />
                <Label htmlFor="interest">กำลังศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="success" name="status" value="สำเร็จการศึกษา" />
                <Label htmlFor="success">สำเร็จการศึกษา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="fail" name="status" value="พ้นสภาพ" />
                <Label htmlFor="fail">พ้นสภาพ</Label>
              </div>
            </fieldset>
          </form>

          <div>
            <p>เวลาที่เพิ่มข้อมูล</p>
            <div>
              <p>ตั้งแต่</p>
              <Datepicker
                language="th"
                labelTodayButton="วันนี้"
                labelClearButton="ล้าง"
                defaultDate={
                  new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
                onSelectedDateChanged={(date) =>
                  setPayload({
                    ...payload,
                    dateStart: date?.toISOString() || null,
                  })
                }
              />
            </div>
            <div>
              <p>ถึง</p>
              <Datepicker
                language="th"
                labelTodayButton="วันนี้"
                labelClearButton="ล้าง"
                defaultDate={new Date()}
                onSelectedDateChanged={(date) =>
                  setPayload({
                    ...payload,
                    dateEnd: date?.toISOString() || null,
                  })
                }
              />
            </div>
          </div>
          <form>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              onChange={(e: any) =>
                setPayload({ ...payload, studentId: e.target.value })
              }
            >
              <legend className="mb-4">รหัสนักศึกษา</legend>
              <div className="flex items-center gap-2">
                <Radio id="i" name="studentId" value="1" defaultChecked />
                <Label htmlFor="i">เรียงจากน้อยไปมาก</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="-i" name="studentId" value="-1" />
                <Label htmlFor="-i">เรียงจากมากไปน้อย</Label>
              </div>
            </fieldset>
          </form>
          <form>
            <legend className="mb-4">หลักสูตร</legend>
            <div className="flex max-w-md flex-col gap-4" id="checkbox">
              {dataProgram?.programs?.map((item, index) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={item._id}
                    checked={filter.program.includes(item._id)}
                    onChange={(e: any) =>
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        program: e.target.checked
                          ? [...prevFilter.program, item._id]
                          : prevFilter.program.filter((id) => id !== item._id),
                      }))
                    }
                  />
                  <Label htmlFor={item._id}>{item.name}</Label>
                </div>
              ))}
            </div>
          </form>
          <form>
            <legend className="mb-4">สาขาวิชา</legend>
            <div className="flex max-w-md flex-col gap-4" id="checkbox">
              {dataMajor?.data?.map((item, index) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={item._id}
                    checked={filter.major.includes(item._id)}
                    onChange={(e: any) =>
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        major: e.target.checked
                          ? [...prevFilter.major, item._id]
                          : prevFilter.major.filter((id) => id !== item._id),
                      }))
                    }
                  />
                  <Label htmlFor={item._id}>{item.name}</Label>
                </div>
              ))}
            </div>
          </form>
          <form>
            <legend className="mb-4">แขนง</legend>
            <div className="flex max-w-md flex-col gap-4" id="checkbox">
              {dataSectAll?.sects?.map((item, index) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={item._id}
                    checked={filter.sect.includes(item._id)}
                    onChange={(e: any) =>
                      setFilter((prevFilter) => ({
                        ...prevFilter,
                        sect: e.target.checked
                          ? [...prevFilter.sect, item._id]
                          : prevFilter.sect.filter((id) => id !== item._id),
                      }))
                    }
                  />
                  <Label htmlFor={item._id}>{item.name}</Label>
                </div>
              ))}
            </div>
          </form>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default DrawerFilter;

import React from "react";
import { Drawer, ButtonToolbar } from "rsuite";
import { Button } from "flowbite-react";
import { Label, Select, Radio } from "flowbite-react";
import { Datepicker } from "flowbite-react";

const DrawerFilter = ({ setPayload, payload }: any) => {
  const [open, setOpen] = React.useState(false);

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
          {/* <form>
            <fieldset
              className="flex max-w-md flex-col gap-4"
              onChange={(e: any) =>
                setPayload({ ...payload, createdAt: e.target.value })
              }
              defaultValue={payload.createdAt}
            >
              <legend className="mb-4">เวลาในการสร้าง</legend>
              <div className="flex items-center gap-2">
                <Radio id="i_time" name="createdAt" value="-1" defaultChecked />
                <Label htmlFor="i_time">เรียงจากล่าสุดไปเก่าสุด</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio id="-i_time" name="createdAt" value="1" />
                <Label htmlFor="-i_time">เรียงจากเก่าสุดไปล่าสุด</Label>
              </div>
            </fieldset>
          </form> */}
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
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default DrawerFilter;

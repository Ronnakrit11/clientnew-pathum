import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Font,
  pdf,
  Link,
} from "@react-pdf/renderer";
import { Button } from "flowbite-react";
import { FaFilePdf } from "react-icons/fa6";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

// Register Thai Sarabun PSK font
Font.register({
  family: "Thai Sarabun PSK",
  src: "/fonts/THSarabun.ttf", // Ensure the path to the font is correct
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#F9FAFB",
    padding: 40,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
  sectionHeader: {
    alignItems: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  text: {
    fontFamily: "Thai Sarabun PSK",
    fontSize: 12,
    marginBottom: 4,
  },
  textBold: {
    fontFamily: "Thai Sarabun PSK",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  image: {
    width: 100,
    height: 100,
    // borderRadius: 50,
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionCol: {
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
  },
  sectionTitle: {
    fontFamily: "Thai Sarabun PSK",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textDecoration: "underline",
  },
  textDate: {
    fontFamily: "Thai Sarabun PSK",
    fontSize: 12,
  },
});

const ExportUserPDF = ({ data }) => {
  const generatePDF = async () => {
    const doc = (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header Section */}

          <View style={styles.sectionHeader}>
            <Image source="/logo.png" style={styles.logo} />
            <Text style={styles.textBold}>คณะวิทยาศาสตร์และเทคโนโลยี</Text>
            <Text style={styles.textBold}>สถาบันเทคโนโลยีปทุมวัน</Text>
            <Text style={styles.textDate}>
              ออก ณ วันที่ :{" "}
              {dayjs()
                .tz("Asia/Bangkok")
                .format("เวลา mm:ss วันที่ DD/MM/YYYY")}
            </Text>
          </View>

          <View style={styles.sectionRow}>
            <Image
              source={
                data?.avatar
                  ? data?.avatar?.url
                  : "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
              }
              style={styles.image}
            />
          </View>
          {/* Student Information Section */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionCol}>
              <Text style={styles.sectionTitle}>ข้อมูลนักศึกษา</Text>
              <Text style={styles.text}>รหัสนักศึกษา: {data.studentId}</Text>
              <Text style={styles.text}>
                ชื่อ-นามสกุล: {data.prefix} {data.name}
              </Text>
              <Text style={styles.text}>หลักสูตร: {data.program.name}</Text>
              <Text style={styles.text}>สาขาวิชา: {data.major.name}</Text>
              <Text style={styles.text}>ปีการศึกษา: {data.academicYear}</Text>
            </View>
            <View style={styles.sectionCol}>
              <Text style={styles.sectionTitle}>ข้อมูลสำหรับการติดต่อ</Text>
              <Text style={styles.text}>อีเมลล์: {data.email}</Text>
              <Text style={styles.text}>เบอร์โทรศัพท์: {data.phoneNumber}</Text>
              <Text style={styles.text}>Line ID: {data.lineId}</Text>
              <Text style={styles.text}>ที่อยู่: {data.address}</Text>
            </View>
          </View>

          {/* Internship Information Section */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionCol}>
              <Text style={styles.sectionTitle}>ประวัติการสหกิจศึกษา</Text>
              <Text style={styles.text}>
                สถานประกอบการณ์ฝึกงาน: {data.intern.name}
              </Text>
              <Text style={styles.text}>
                ประเภทสถานประกอบการ: {data.intern.category}
              </Text>
              <Text style={styles.text}>
                หน่วยงานที่นักศึกษาออกสหกิจ: {data.intern.agency}
              </Text>
              <Text style={styles.text}>
                เบอร์สถานประกอบการ: {data.intern.phone_number}
              </Text>
              <Text style={styles.text}>
                ชื่อพนักงานติดต่อ: {data.intern.name_of_establishment}
              </Text>
              <Text style={styles.text}>
                Line ID พนักงานติดต่อ: {data.intern.idLine_of_establishment}
              </Text>
              <Text style={styles.text}>ที่อยู่: {data.intern.address}</Text>
              <Text style={styles.text}>
                หมายเหตุ อื่นๆ: {data.intern.note}
              </Text>
            </View>

            {/* Project Information Section */}
          </View>
          <View style={styles.sectionRow}>
            {data.thesis && (
              <View style={styles.sectionCol}>
                <Text style={styles.sectionTitle}>ประวัติการสหกิจศึกษา</Text>
                <Text style={styles.text}>
                  สถานประกอบการณ์ฝึกงาน: {data.thesis.company}
                </Text>
                <Text style={styles.text}>
                  ประเภทสถานประกอบการ: {data.thesis.type}
                </Text>
                <Text style={styles.text}>
                  หัวข้อปริญญานิพนธ์: {data.thesis.title}
                </Text>
                <Text style={styles.text}>
                  ไฟล์ Download: <Link>{data.thesis.url}</Link>
                </Text>
                <Text style={styles.text}>
                  อาจารย์ที่ปรึกษาคนที่ 1: {data.thesis.advisor1}
                </Text>
                <Text style={styles.text}>
                  อาจารย์ที่ปรึกษาคนที่ 2: {data.thesis.advisor2}
                </Text>
                <Text style={styles.text}>
                  อาจารย์ที่ปรึกษาคนที่ 3: {data.thesis.advisor3}
                </Text>
              </View>
            )}
          </View>
        </Page>
      </Document>
    );

    const blob = await pdf(doc).toBlob();
    const url = URL.createObjectURL(blob);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "user_report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up
  };

  return (
    <div>
      <Button
        onClick={generatePDF}
        color="failure"
        size="sm"
        className="flex gap-2"
      >
        <FaFilePdf />
        Export PDF
      </Button>
    </div>
  );
};

export default ExportUserPDF;

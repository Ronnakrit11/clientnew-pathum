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
} from "@react-pdf/renderer";
import { Button } from "flowbite-react";
import { FaFilePdf } from "react-icons/fa6";
import dayjs from "dayjs";

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
    fontSize: 14,
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
    borderRadius: 50,
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textDecoration: "underline",
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
          </View>

          {/* Student Information Section */}
          <View style={styles.sectionRow}>
            <View style={styles.sectionCol}>
              <Image
                source="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                style={styles.image}
              />
              <Text style={styles.sectionTitle}>ข้อมูลนักศึกษา</Text>
              <Text style={styles.text}>รหัสนักศึกษา: {data.studentId}</Text>
              <Text style={styles.text}>
                ชื่อ-นามสกุล: {data.prefix} {data.name}
              </Text>
              <Text style={styles.text}>หลักสูตร: {data.program.name}</Text>
              <Text style={styles.text}>สาขาวิชา: {data.major.name}</Text>
              <Text style={styles.text}>ปีการศึกษา: {data.academicYear}</Text>
            </View>

            {/* Contact Information Section */}
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
                สถานประกอบการณ์ฝึกงาน: {data.intern.company}
              </Text>
              <Text style={styles.text}>
                ประเภทสถานประกอบการ: {data.intern.type}
              </Text>
              <Text style={styles.text}>
                หน่วยงานที่นักศึกษาออกสหกิจ: {data.intern.department}
              </Text>
              <Text style={styles.text}>
                เบอร์สถานประกอบการ: {data.intern.phone}
              </Text>
              <Text style={styles.text}>
                ชื่อพนักงานติดต่อ: {data.intern.contactName}
              </Text>
              <Text style={styles.text}>
                Line ID พนักงานติดต่อ: {data.intern.contactLineId}
              </Text>
              <Text style={styles.text}>
                รายละเอียดเพิ่มเติม: {data.intern.details}
              </Text>
              <Text style={styles.text}>
                หมายเหตุ อื่นๆ: {data.intern.note}
              </Text>
            </View>

            {/* Project Information Section */}
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
                  ไฟล์ Download: {data.thesis.url}
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
          <View style={styles.sectionHeader}>
            <Text style={styles.textBold}>
              ออก ณ วันที่ :{" "}
              {dayjs(Date.now()).format("เวลา mm:ss วันที่ DD/MM/YYYY")}
            </Text>
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

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const convertToCSV = (data, headers) => {
  const rows = data.map((user, index) => [
    index + 1,
    user?.name,
    user?.major?.name,
    user?.program?.name,
    user?.thesis?.url,
    user?.academicYear,
    user?.thesis?.advisor1,
    user?.thesis?.advisor2,
    user?.thesis?.advisor3,
  ]);
  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
  return csvContent;
};

const downloadPDF = () => {
  const table: any = document.querySelector(".overflow-x-auto"); // เลือกส่วนของตาราง
  if (!table) {
    alert("ไม่พบข้อมูลสำหรับการสร้าง PDF");
    return;
  }

  html2canvas(table).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth - 20; // ลดขอบ 10 มม. ทั้งซ้ายและขวา
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let y = 10; // เริ่มต้นที่ 10 มม. จากขอบบน
    if (imgHeight > pageHeight) {
      // ถ้าสูงเกิน 1 หน้า ให้แบ่งหน้า
      while (y < canvas.height) {
        pdf.addImage(
          imgData,
          "PNG",
          10,
          y - canvas.height,
          imgWidth,
          imgHeight
        );
        y += pageHeight;
        if (y < canvas.height) pdf.addPage();
      }
    } else {
      pdf.addImage(imgData, "PNG", 10, y, imgWidth, imgHeight);
    }
    pdf.save("thesis_users.pdf");
  });
};

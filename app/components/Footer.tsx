import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEmail,MdLocalPhone } from "react-icons/md";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="bg-white border-t">
      <div className="border border-[#ffffff0e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex flex-col space-y-4">
            <div>
              <h2 className="text-[24px] font-[800] text-primary">
                คณะวิทยาศาสตร์และเทคโนโลยี สถาบันเทคโนโลยีปทุมวัน
              </h2>
              <p>
                เลขที่ 833 ถนนพระราม 1 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร
                10330
              </p>
            </div>

            <div className="flex items-center gap-2">
              <MdLocalPhone size={25} />
              <p>ติดต่อโทร : + 66 2 104 9099 ต่อ 2100</p>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail size={25} />
              <p>Email : sciptwit2019@gmail.com</p>
            </div>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17964.63672990379!2d100.51734501357484!3d13.747658500912095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2993268c7c625%3A0x4a78719dbe3d32d8!2z4Liq4LiW4Liy4Lia4Lix4LiZ4LmA4LiX4LiE4LmC4LiZ4LmC4Lil4Lii4Li14Lib4LiX4Li44Lih4Lin4Lix4LiZ!5e1!3m2!1sth!2sth!4v1732973477937!5m2!1sth!2sth"
              width="500"
              height="200"
              loading="lazy"
              className="w-full h-full rounded-md"
            ></iframe>
          </div>
        </div>
        <br />
        <p className="text-center text-black mt-8">
          สงวนลิขสิทธิ์ © 2557 โดย คณะวิทยาศาสตร์และเทคโนโลยี
          สถาบันเทคโนโลยีปทุมวัน
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;

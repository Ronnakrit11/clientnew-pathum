"use client";
import "./globals.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import { CustomProvider } from "rsuite";
import { Poppins, Anuphan } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider, useSession } from "next-auth/react";
import React, { FC, useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";
import SimpleBackdrop from "./components/Loading/SimpleBackdrop";
import type { CustomFlowbiteTheme } from "flowbite-react";

import { Flowbite } from "flowbite-react";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-[#ad232c] text-white hover:bg-[#861b22]", // ปรับสีปุ่ม
    },
  },
  textInput: {
    base: "border-[#ad232c] focus:ring-[#ad232c]", // ปรับสี TextInput
  },
  select: {
    base: "border-[#ad232c] focus:ring-[#ad232c]", // ปรับสี Select
  },
};

const poppins = Anuphan({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.localStorage.setItem("theme", "light");
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${poppins.variable} ${josefin.variable} bg-no-repeat dark:bg-gradient-to-b text-black dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Custom>
                <CustomProvider>
                  <Flowbite theme={{ theme: customTheme }}>
                    <div>{children}</div>
                  </Flowbite>
                </CustomProvider>
              </Custom>
              <Toaster position="top-center" reverseOrder={false} />
            </ThemeProvider>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading } = useLoadUserQuery({});
  const { data: session } = useSession();

  useEffect(() => {
    socketId.on("connection", () => {});
  }, []);

  return (
    <div>
      {isLoading && session ? (
        <Loader />
      ) : (
        <div className="font-Poppins">{children} </div>
      )}
    </div>
  );
  // return <div>{children} </div>
};

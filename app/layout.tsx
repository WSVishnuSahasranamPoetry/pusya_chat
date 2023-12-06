import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { Image } from "next/dist/client/image-component";
import { LoginButton, LogoutButton } from "./components/Buttons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VV17CH3R chat",
  description: "VV17CH3R prod. chat app.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <nav className="flex lg:px-10 px-3 py-5 justify-between fixed top-0 left-0 w-full bg-white/50">
            <h1 className="text-2xl lg:text-3xl font-bold">
              Чат <span className="text-teal-500">Пуси</span> :3
            </h1>
            {session ? (
              <div className="flex items-center">
                <Image
                  src={session?.user?.image as string}
                  alt="user image"
                  className="h-12 w-12 rounded-full mr-3"
                  width={50}
                  height={50}
                /> 
                <LogoutButton />
              </div>
            ) : (
              <LoginButton />
            )}
          </nav>
          <main className="realative">
            <Image
              src="/pusya-logo.png"
              className="absolute top-[50%] left-0"
              alt="pusya-logo"
              width={100}
              height={100}
            />
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}

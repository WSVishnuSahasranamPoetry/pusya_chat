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
          <nav className="flex lg:px-10 px-3 py-2 md:py-4 justify-between fixed top-0 left-0 w-full bg-white">
            <h1 className="text-xl lg:text-3xl font-bold">
              Чат <span className="text-teal-500">VV17</span>
            </h1>
            {session ? (
              <div className="flex items-center">
                <Image
                  src={session?.user?.image as string}
                  alt="user image"
                  className="h-8 w-8 md:w-12  md:h-12 rounded-full mr-3"
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
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}

import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { dark } from "@clerk/themes";
import "../globals.css";

export const metadata: Metadata = {
  title: "Threads",
  description: "a Next.js 15 eta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      afterSignOutUrl={"/sign-in"}
      appearance={{ baseTheme: dark }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="flex w-full h-screen justify-center items-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
export default Layout;

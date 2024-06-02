import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderNav from "@/components/header/header-nav";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ink-Spier",
  description:
    "Ink-Spire is a blog platform for developers to share their knowledge and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <HeaderNav />
          <main className="mx-auto max-w-6xl px-4">{children}</main>
        </ThemeProvider>
        <Toaster position="top-left" />
      </body>
    </html>
  );
}

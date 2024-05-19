import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
const josefin = Josefin_Sans({ subsets: ["latin"] });
import HeaderNav from "@/components/header/header-nav";

export const metadata: Metadata = {
  title: "Blogify",
  description:
    "Blogify is a blog platform for developers to share their knowledge and experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${josefin.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container">
            <HeaderNav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

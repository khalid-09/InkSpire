import type { Metadata } from "next";
import { Inter, Josefin_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import HeaderNav from "@/components/header/header-nav";
import { SparklesCore } from "@/components/ui/sparkles";

const josefin = Josefin_Sans({ subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"] });

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
      <body
        className={`${josefin.className} relative min-h-screen overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute inset-0 -z-20 ">
            <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
          </div>
          <main className="relative m-auto max-w-5xl">
            <HeaderNav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

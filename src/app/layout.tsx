import type { Metadata } from 'next';
import { Inter, Josefin_Sans } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import HeaderNav from '@/components/header-nav';

const josefin = Josefin_Sans({ subsets: ['latin'] });

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blogify',
  description:
    'Blogify is a blog platform for developers to share their knowledge and experience.',
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
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-5xl m-auto">
            <HeaderNav />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

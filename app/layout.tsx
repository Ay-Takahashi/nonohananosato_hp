import type { Metadata } from "next";
import { Klee_One } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";

const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-klee-one",
});

export const metadata: Metadata = {
  title: "野の花の郷 - 心を込めた料理でおもてなし",
  description: "地元の新鮮な食材を使用した、心を込めた料理をご提供いたします。",
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.svg`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const watermarkBgPath = getImagePath('/images/08_2.jpg');
  
  return (
    <html lang="ja">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --watermark-bg-image: url('${watermarkBgPath}');
          }
        ` }} />
      </head>
      <body className={`${kleeOne.variable} antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  title: "野の花の郷 - 心を込めた料理でおもてなし",
  description: "地元の新鮮な食材を使用した、心を込めた料理をご提供いたします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.variable} antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

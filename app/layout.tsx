import type { Metadata } from "next";
import { Klee_One } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getImagePath } from "@/lib/utils";
import facilityInfo from "@/data/facilityInfo.json";

const kleeOne = Klee_One({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-klee-one",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nonohanasato.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "野の花の郷 - 心を込めた料理でおもてなし",
    template: "%s | 野の花の郷",
  },
  description: "地元の新鮮な食材を使用した、心を込めた料理をご提供いたします。大分県玖珠郡九重町の自然豊かな環境で、四季折々の味覚をお楽しみください。",
  keywords: ["野の花の郷", "レストラン", "九重町", "大分", "地元料理", "新鮮な食材", "観光", "グルメ"],
  authors: [{ name: "野の花の郷" }],
  creator: "野の花の郷",
  publisher: "野の花の郷",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: "野の花の郷 - 心を込めた料理でおもてなし",
    description: "地元の新鮮な食材を使用した、心を込めた料理をご提供いたします。大分県玖珠郡九重町の自然豊かな環境で、四季折々の味覚をお楽しみください。",
    siteName: "野の花の郷",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/IMG_8327.JPG`,
        width: 1200,
        height: 630,
        alt: "野の花の郷",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "野の花の郷 - 心を込めた料理でおもてなし",
    description: "地元の新鮮な食材を使用した、心を込めた料理をご提供いたします。",
    images: [`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/IMG_8327.JPG`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.svg`,
  },
  verification: {
    // Google Search Consoleの検証コードをここに追加できます
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const watermarkBgPath = getImagePath('/images/08_2.jpg');
  
  // 構造化データ（JSON-LD）
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": facilityInfo.facilityName,
    "image": `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/images/IMG_8327.JPG`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": facilityInfo.address.full,
      "addressLocality": "九重町",
      "addressRegion": "大分県",
      "postalCode": facilityInfo.address.postalCode.replace('〒', ''),
      "addressCountry": "JP"
    },
    "telephone": facilityInfo.contact.tel,
    "email": facilityInfo.contact.email,
    "url": siteUrl,
    "servesCuisine": "和食",
    "priceRange": "¥¥",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "14:00"
    },
    "acceptsReservations": "True"
  };
  
  return (
    <html lang="ja">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --watermark-bg-image: url('${watermarkBgPath}');
          }
        ` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${kleeOne.variable} antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

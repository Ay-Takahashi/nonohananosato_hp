import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "メニュー",
  description: "野の花の郷のメニューをご紹介。地元の新鮮な食材を使用した四季折々の料理をお楽しみいただけます。御膳メニュー、コース料理など多彩なメニューをご用意しております。",
  keywords: ["メニュー", "料理", "九重町", "大分", "地元料理", "野の花の郷", "御膳", "コース"],
  openGraph: {
    title: "メニュー | 野の花の郷",
    description: "野の花の郷のメニューをご紹介。地元の新鮮な食材を使用した四季折々の料理をお楽しみいただけます。",
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

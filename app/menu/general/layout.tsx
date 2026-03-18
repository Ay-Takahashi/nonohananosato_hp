import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "一般メニュー",
  description: "野の花の郷の一般メニュー。御膳、定食など、地元の新鮮な食材を使用した多彩な料理をご用意しております。",
  keywords: ["一般メニュー", "御膳", "定食", "野の花の郷", "九重町", "大分料理"],
  openGraph: {
    title: "一般メニュー | 野の花の郷",
    description: "野の花の郷の一般メニュー。御膳、定食など、地元の新鮮な食材を使用した多彩な料理をご用意しております。",
  },
};

export default function GeneralMenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

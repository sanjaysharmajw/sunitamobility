import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suneeta E Mobility | Ride the Future, Ride Electric",
  description:
    "Suneeta E Mobility builds smart, stylish and affordable electric bikes. Up to 198 km range, fast charging and zero emissions. Book your test ride today.",
  keywords: [
    "EV bike",
    "electric bike",
    "electric scooter",
    "Suneeta E Mobility",
    "electric two wheeler India",
  ],
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable} antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}

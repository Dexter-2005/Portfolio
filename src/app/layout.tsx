import type { Metadata } from "next";
import { JetBrains_Mono, DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Himanshu Repswal — Competitive Programmer & Full-Stack Developer",
  description:
    "Portfolio of Himanshu Repswal — Codeforces Pupil (1257), ACM Problem Setter, Full-Stack Developer. 272 problems solved on Codeforces. ECE @ LNMIIT Jaipur.",
  keywords: [
    "Himanshu Repswal",
    "competitive programming",
    "codeforces",
    "portfolio",
    "full-stack developer",
    "LNMIIT",
  ],
  authors: [{ name: "Himanshu Repswal" }],
  openGraph: {
    title: "Himanshu Repswal — Competitive Programmer & Full-Stack Developer",
    description:
      "CF Pupil (1257) · 272 Problems Solved · ACM Problem Setter · Full-Stack Dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${dmSans.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

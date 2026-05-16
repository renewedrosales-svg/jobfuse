import "./globals.css";

import Navbar
from "@/components/Navbar";

import Footer
from "@/components/Footer";

export const metadata = {

  metadataBase: new URL(
    "https://jobfuse.vercel.app"
  ),

  title: {
    default:
      "JobFuse — Modern Job Board Platform",

    template:
      "%s | JobFuse",
  },

  description:
    "JobFuse is a modern hiring platform connecting employers with talented professionals.",

  keywords: [
    "jobs",
    "careers",
    "employment",
    "job board",
    "remote jobs",
    "hiring platform",
  ],

  openGraph: {

    title:
      "JobFuse — Modern Job Board Platform",

    description:
      "Find jobs and connect with employers through JobFuse.",

    url:
      "https://jobfuse.vercel.app",

    siteName:
      "JobFuse",

    locale:
      "en_US",

    type:
      "website",
  },

  twitter: {

    card:
      "summary_large_image",

    title:
      "JobFuse",

    description:
      "Modern hiring platform for employers and job seekers.",
  },

  robots: {

    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">

      <body>

        <Navbar />

        {children}

        <Footer />

      </body>
    </html>
  );
}
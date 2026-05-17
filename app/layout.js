import "./globals.css";

import Navbar
from "@/components/Navbar";

import Footer
from "@/components/Footer";

import {
  Toaster,
} from "react-hot-toast";

import {
  Analytics,
} from "@vercel/analytics/react";

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

      <body className="bg-white text-slate-900 antialiased">

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={12}
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{

            duration: 4000,

            style: {

              background: "#ffffff",

              color: "#0f172a",

              borderRadius: "18px",

              padding: "16px 18px",

              border:
                "1px solid #e2e8f0",

              boxShadow:
                "0 10px 30px rgba(15,23,42,0.08)",

              fontSize: "14px",

              fontWeight: "500",
            },

            success: {

              iconTheme: {

                primary: "#2563eb",

                secondary: "#ffffff",
              },
            },

            error: {

              iconTheme: {

                primary: "#dc2626",

                secondary: "#ffffff",
              },
            },
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>

          {children}

        </main>

        {/* Footer */}
        <Footer />
        
        {/* Vercel Analytics */}
        <Analytics />

      </body>
    </html>
  );
}
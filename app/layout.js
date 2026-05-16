import "./globals.css";

import Navbar
from "@/components/Navbar";

import Footer
from "@/components/Footer";

export const metadata = {
  title:
    "JobFuse - Modern Job Marketplace",

  description:
    "Find jobs and connect with employers through JobFuse.",
};

export default function RootLayout({
  children,
}) {

  return (
    <html lang="en">

      <body>

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main>
          {children}
        </main>

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
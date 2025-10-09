import { Providers } from "@/components/Providers";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import Footer from "@/components/Utility/Footer";
import ScrollToTop from "@/components/Utility/ScrollToTop";

export const metadata = {
  title: "Coaching",
  description: "Coaching Management System",
  icons: {
    icon: [{ url: "/icon2.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

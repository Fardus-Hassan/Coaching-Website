import { Providers } from "@/components/Providers";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import Footer from "@/components/Utility/Footer";
import ScrollToTop from "@/components/Utility/ScrollToTop";
import baseUrl from "@/components/Utility/apiConfig";
import SiteColorProvider from "@/components/SiteColorProvider";

export async function generateMetadata() {
  try {
    const res = await fetch(`${baseUrl()}institutes/`, {
      cache: "force-cache",
    });
    const data = await res.json();
    const institute = data[0];

    return {
      title: institute?.institute_name || "Coaching",
      description: "Coaching Management System",
      icons: {
        icon: [
          {
            url: institute?.institute_logo || "/icon2.png",
            type: "image/png",
          },
        ],
      },
    };
  } catch {
    return {
      title: "Coaching",
      description: "Coaching Management System",
      icons: {
        icon: [{ url: "/icon2.png" }],
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteColorProvider>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
          </SiteColorProvider>
        </Providers>
      </body>
    </html>
  );
}

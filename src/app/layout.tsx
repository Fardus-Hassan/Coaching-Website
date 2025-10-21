import { Providers } from "@/components/Providers";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import Footer from "@/components/Utility/Footer";
import ScrollToTop from "@/components/Utility/ScrollToTop";
import SiteColorProvider from "@/components/SiteColorProvider";
import { getServerBaseUrl } from "@/apiConfig";
import { headers } from "next/headers";

export async function generateMetadata() {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || '';
    const apiUrl = getServerBaseUrl(host);
    
    const res = await fetch(`${apiUrl}institutes/`, {
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
    <html lang="bn">
      <body>
        <Providers>
          <SiteColorProvider>
            <Navbar />
            <div className="min-h-[70vh]">
            {children}
            </div>
            <Footer />
            <ScrollToTop />
          </SiteColorProvider>
        </Providers>
      </body>
    </html>
  );
}

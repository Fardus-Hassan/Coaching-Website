import { Providers } from "@/components/Providers";
import "./globals.css";
import Navbar from "@/components/Utility/Navbar";
import Footer from "@/components/Utility/Footer";
import ScrollToTop from "@/components/Utility/ScrollToTop";
import { useGetInstitutesQuery } from "@/redux/features/api/institute/instituteApi";

export async function generateMetadata() {
  try {
    const res = await fetch("https://coaching.attendclub.top/api/institutes/", {
      cache: "no-store",
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
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

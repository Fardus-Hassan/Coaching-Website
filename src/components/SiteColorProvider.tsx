"use client";

import { useGetSiteColorsQuery } from "@/redux/features/api/siteColor/siteColorApi";
import { useEffect } from "react";

export default function SiteColorProvider({ children }: { children: React.ReactNode }) {
  const { data = [], isLoading } = useGetSiteColorsQuery();

  useEffect(() => {
    if (data && data.length > 0) {
      const color = data[0];
      document.documentElement.style.setProperty("--color-primary", color.primary_color);
      document.documentElement.style.setProperty("--color-secondary", color.secondary_color);
      document.documentElement.style.setProperty("--color-others", color.others_color);
      document.documentElement.style.setProperty("--color-text", color.text_color);
    }
  }, [data]);

  if (isLoading) return <div className="text-center py-10">Loading theme...</div>;

  return <>{children}</>;
}

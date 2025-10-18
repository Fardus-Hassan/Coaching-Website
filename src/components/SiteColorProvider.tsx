"use client";

import { useGetSiteColorsQuery } from "@/redux/features/api/siteColor/siteColorApi";
import { useEffect, useMemo } from "react";

export default function SiteColorProvider({ children }: { children: React.ReactNode }) {
  const { data = [], isLoading } = useGetSiteColorsQuery();

  const color = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) return data[0];
    return {
      primary_color: "#26208a",
      secondary_color: "#131052",
      others_color: "#1005fa",
      text_color: "#000",
    };
  }, [data]);

  useEffect(() => {
    if (color) {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", color.primary_color);
      root.style.setProperty("--color-secondary", color.secondary_color);
      root.style.setProperty("--color-others", color.others_color);
      root.style.setProperty("--color-text", color.text_color);
    }
  }, [color]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center text-gray-200 bg-white h-screen">
        Loading...
      </div>
    );

  return <>{children}</>;
}

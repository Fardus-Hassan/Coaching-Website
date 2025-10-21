"use client";

import { useGetSiteColorsQuery } from "@/redux/features/api/siteColor/siteColorApi";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, createContext, useContext } from "react";

export interface SiteColor {
  primary_color: string | null;
  secondary_color: string | null;
  others_color: string | null;
  text_color: string | null;
}

const DEFAULT_COLOR: SiteColor = {
  primary_color: "#26208a",
  secondary_color: "#131052",
  others_color: "#1005fa",
  text_color: "#000",
};

const ColorContext = createContext<SiteColor>(DEFAULT_COLOR);

export default function SiteColorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data = [], isLoading } = useGetSiteColorsQuery();

  const color: SiteColor = useMemo(() => {
    if (Array.isArray(data) && data.length > 0) return data[0];
    return DEFAULT_COLOR;
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
      <div className="flex justify-center items-center text-gray-500 bg-white h-screen">
        <Loader2 className="w-14 h-14 text-gray-500 animate-spin" />{" "}
      </div>
    );

  return (
    <ColorContext.Provider value={color}>{children}</ColorContext.Provider>
  );
}

export const useSiteColor = () => {
  const context = useContext(ColorContext);
  if (!context) {
    return DEFAULT_COLOR;
  }
  return context;
};

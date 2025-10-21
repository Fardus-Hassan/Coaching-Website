import { apiSlice } from "../apiSlice";

export interface SiteColor {
  id: number;
  primary_color: string | null;
  secondary_color: string | null;
  others_color: string | null;
  text_color: string | null;
}

export const siteColorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSiteColors: builder.query<SiteColor[], void>({
      query: () => "sitecolors/",
      providesTags: ["SiteColor"],
    }),
  }),
});

export const { useGetSiteColorsQuery } = siteColorApi;

import { apiSlice } from "../apiSlice";

export interface SiteColor {
  id: number;
  primary_color: string;
  secondary_color: string;
  others_color: string;
  text_color: string;
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

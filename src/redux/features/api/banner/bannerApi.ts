import { apiSlice } from "../apiSlice";

export interface Banner {
  id: number;
  heading: string | null;
  description: string | null;
  banner_image: string | null;
  status: string | null;
}

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], void>({
      query: () => "banners/",
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;

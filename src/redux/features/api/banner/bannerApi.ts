import { apiSlice } from "../apiSlice";

export interface Banner {
  id: number;
  heading: string;
  description: string;
  banner_image: string;
  status: string;
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

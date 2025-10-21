import { apiSlice } from "../apiSlice";

export interface Gallery {
  id: number;
  featured: boolean;
  tag: string;
  galary_image: string;
  status: string;
}

export const galleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleries: builder.query<Gallery[], void>({
      query: () => "galleries/",
      providesTags: ["Gallery"],
    }),
  }),
});

export const { useGetGalleriesQuery } = galleryApi;

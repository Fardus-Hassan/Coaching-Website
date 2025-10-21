import { apiSlice } from "../apiSlice";

export interface Gallery {
  id: number;
  featured: boolean | null;
  tag: string | null;
  galary_image: string | null;
  status: string | null;
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

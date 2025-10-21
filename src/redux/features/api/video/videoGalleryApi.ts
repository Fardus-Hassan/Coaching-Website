import { apiSlice } from "../apiSlice";

export interface VideoGallery {
  id: number;
  featured: boolean | null;
  heading: string | null;
  sub_heading: string | null;
  img: string | null;
  link: string | null;
  status: string | null;
}

export const videoGalleryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all video galleries
    getVideoGalleries: builder.query<VideoGallery[], void>({
      query: () => "video-galleries/",
      providesTags: ["VideoGallery"],
    }),
  }),
});

// Auto-generated React hook
export const { useGetVideoGalleriesQuery } = videoGalleryApi;

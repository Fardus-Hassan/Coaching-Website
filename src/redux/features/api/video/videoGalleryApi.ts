import { apiSlice } from "../apiSlice";

export interface VideoGallery {
  id: number;
  featured: boolean;
  heading: string;
  sub_heading: string;
  img: string;
  link: string;
  status: string;
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

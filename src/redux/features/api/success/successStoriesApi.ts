import { apiSlice } from "../apiSlice";

export interface SuccessStory {
  id: number;
  name: string | null;
  image: string | null;
  designation: string | null;
  institute: string | null;
  description: string | null;
}

export const successStoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuccessStories: builder.query<SuccessStory[], void>({
      query: () => "success-stories/",
      providesTags: ["SuccessStories"],
    }),
  }),
});

export const { useGetSuccessStoriesQuery } = successStoriesApi;

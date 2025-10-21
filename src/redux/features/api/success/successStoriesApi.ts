import { apiSlice } from "../apiSlice";

export interface SuccessStory {
  id: number;
  name: string;
  image: string;
  designation: string;
  institute: string;
  description: string;
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

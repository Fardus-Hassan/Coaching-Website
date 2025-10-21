import { apiSlice } from "../apiSlice";

export interface CoachingHistory {
  id: number;
  heading: string;
  description: string;
  img: string;
  video_link: string;
  tag: string;
}

export const coachingHistoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoachingHistories: builder.query<CoachingHistory[], void>({
      query: () => "coaching-histories/",
      providesTags: ["CoachingHistory"],
    }),
  }),
});

export const { useGetCoachingHistoriesQuery } = coachingHistoryApi;

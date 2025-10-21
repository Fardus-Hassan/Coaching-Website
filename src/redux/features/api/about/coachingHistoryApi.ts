import { apiSlice } from "../apiSlice";

export interface CoachingHistory {
  id: number;
  heading: string | null;
  description: string | null;
  img: string | null;
  video_link: string | null;
  tag: string | null;
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

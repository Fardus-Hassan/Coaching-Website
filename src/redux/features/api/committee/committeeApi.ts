import { apiSlice } from "../apiSlice";

export interface Committee {
  id: number;
  name: string | null;
  img: string | null;
  degination: string | null;
  status: string | null;
}

export const committeeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCommittees: builder.query<Committee[], void>({
      query: () => "committees/",
      providesTags: ["Committee"],
    }),
  }),
});

export const { useGetCommitteesQuery } = committeeApi;

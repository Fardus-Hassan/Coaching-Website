import { apiSlice } from "../apiSlice";

export interface Committee {
  id: number;
  name: string;
  img: string;
  degination: string;
  status: string;
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

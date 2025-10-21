import { apiSlice } from "../apiSlice";

export interface Program {
  id: number;
  title: string | null;
  sub_title: string | null;
  short_description: string | null;
  long_description: string | null;
  price: string | null;
}

export const programApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrograms: builder.query<Program[], void>({
      query: () => "programs/",
      providesTags: ["Program"],
    }),
  }),
});

export const { useGetProgramsQuery } = programApi;

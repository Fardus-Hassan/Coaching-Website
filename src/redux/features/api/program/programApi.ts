import { apiSlice } from "../apiSlice";

export interface Program {
  id: number;
  title: string;
  sub_title: string;
  short_description: string;
  long_description: string;
  price: string;
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

import { apiSlice } from "../apiSlice";

export interface Speech {
  id: number;
  sl: number | null;
  title: string | null;
  name: string | null;
  img: string | null;
  designation: string | null;
  phone: string | null;
  email: string | null;
  speech: string | null;
}

export const speechApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpeeches: builder.query<Speech[], void>({
      query: () => "speeches/",
      providesTags: ["Speech"],
    }),
  }),
});

export const { useGetSpeechesQuery } = speechApi;

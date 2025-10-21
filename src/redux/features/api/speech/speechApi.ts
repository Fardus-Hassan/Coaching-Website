import { apiSlice } from "../apiSlice";

export interface Speech {
  id: number;
  sl: number;
  title: string;
  name: string;
  img: string;
  designation: string;
  phone: string;
  email: string;
  speech: string;
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

import { apiSlice } from "../apiSlice";

export interface InfoBlock {
  id: number;
  highlighter: string;
  footer_text: string;
}

export const infoBlockApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInfoBlocks: builder.query<InfoBlock[], void>({
      query: () => "info-blocks/",
      providesTags: ["InfoBlock"],
    }),
  }),
});

export const { useGetInfoBlocksQuery } = infoBlockApi;

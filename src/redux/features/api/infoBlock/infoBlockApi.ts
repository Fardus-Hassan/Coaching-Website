import { apiSlice } from "../apiSlice";

export interface InfoBlock {
  id: number;
  highlighter: string | null;
  footer_text: string | null;
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

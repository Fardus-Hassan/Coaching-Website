import { apiSlice } from "../apiSlice";

export interface SpecialQuality {
  id: number;
  point: string;
}

export const specialQualitiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialQualities: builder.query<SpecialQuality[], void>({
      query: () => "special-qualities/",
      providesTags: ["SpecialQualities"],
    }),
  }),
});

export const { useGetSpecialQualitiesQuery } = specialQualitiesApi;

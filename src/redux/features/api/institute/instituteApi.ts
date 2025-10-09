import { apiSlice } from "../apiSlice";

export const instituteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutes: builder.query<any, void>({
      query: () => "institutes/",
      providesTags: ["Institute"],
    }),
  }),
});

export const { useGetInstitutesQuery } = instituteApi;

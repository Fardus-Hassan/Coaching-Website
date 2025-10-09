import { apiSlice } from "../apiSlice";

export interface Service {
  id: number;
  service_name: string;
  image: string;
}

export const serviceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query<Service[], void>({
      query: () => "services/",
      providesTags: ["Service"],
    }),
  }),
});

// ✅ Export hook
export const { useGetServicesQuery } = serviceApi;

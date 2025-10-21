import { apiSlice } from "../apiSlice";

export interface Institute {
  id: number;
  institute_id: string | null;
  institute_logo: string | null;
  signature: string | null;
  institute_name: string | null;
  institute_email_address: string | null;
  incharge_manager: string | null;
  incharge_manager_mobile: string | null;
  incharge_manager_email: string | null;
  institute_address: string | null;
  institute_mobile: string | null;
  institute_web: string | null;
  institute_management_web: string | null;
  institute_youtube: string | null;
  institute_fb: string | null;
  status: string | null;
  institute_v_heading: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const instituteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutes: builder.query<Institute[], void>({
      query: () => "institutes/",
      providesTags: ["Institute"],
    }),
  }),
});

export const { useGetInstitutesQuery } = instituteApi;

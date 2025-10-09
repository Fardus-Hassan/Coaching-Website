import { apiSlice } from "../apiSlice";

export interface Institute {
  id: number;
  institute_id: string;
  institute_logo: string;
  signature: string;
  institute_name: string;
  institute_email_address: string;
  incharge_manager: string;
  incharge_manager_mobile: string;
  incharge_manager_email: string;
  institute_address: string;
  institute_mobile: string;
  institute_web: string;
  institute_management_web: string;
  institute_youtube: string;
  institute_fb: string;
  status: string;
  institute_v_heading: string;
  created_at: string;
  updated_at: string;
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

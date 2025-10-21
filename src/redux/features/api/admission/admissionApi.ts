import { apiSlice } from "../apiSlice";

export interface AdmissionYear {
  id: number;
  name: string;
}

export interface StudentClass {
  id: number;
  name: string;
  group: string | null;
  group_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface Batch {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface OnlineAdmission {
  name: string;
  name_in_bangla: string;
  phone_number: string;
  gender: "Male" | "Female" | "Other";
  dob: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  email: string;
  present_address: string;
  permanent_address: string;
  admission_year_id: number;
  class_id: number;
  batch_id: number;
  roll_no: number;
  institute_name: string;
  admission_date: string;
  village: string;
  post_office: string;
  ps_or_upazilla: string;
  district: string;
  g_name: string;
  g_mobile_no: string;
  father_name: string;
  father_mobile_no: string;
  mother_name: string;
  mother_mobile_no: string;
  relation: string;
  f_occupation: string;
  m_occupation: string;
  g_occupation: string;
  f_nid: string;
  m_nid: string;
  g_nid: string;
  status: "Aprove" | "Reject" | "Hold";
  avatar?: string;
  note: string;
}

export const admissionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissionYears: builder.query<AdmissionYear[], void>({
      query: () => "admission-years/",
      providesTags: ["AdmissionYear"],
    }),

    getStudentClasses: builder.query<StudentClass[], void>({
      query: () => "student-classes/",
      providesTags: ["StudentClass"],
    }),

    getBatches: builder.query<Batch[], void>({
      query: () => "batches/",
      providesTags: ["Batch"],
    }),

    createOnlineAdmission: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "online-admissions/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["OnlineAdmission"],
    }),
  }),
});

export const {
  useGetAdmissionYearsQuery,
  useGetStudentClassesQuery,
  useGetBatchesQuery,
  useCreateOnlineAdmissionMutation,
} = admissionApi;
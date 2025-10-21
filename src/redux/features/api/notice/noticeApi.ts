import { apiSlice } from "../apiSlice";

export interface AcademicYear {
  id: number;
  name: string;
}

export interface Notice {
  id: number;
  date: string; 
  notice_title: string;
  notice_description: string;
  expire_date: string;
  file_attached: string;
  academic_year: AcademicYear;
  created_at: string;
  updated_at: string;
}

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<Notice[], void>({
      query: () => "notices/",
      providesTags: ["Notice"],
    }),
  }),
});


export const { useGetNoticesQuery } = noticeApi;

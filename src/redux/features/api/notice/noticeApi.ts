import { apiSlice } from "../apiSlice";

export interface AcademicYear {
  id: number;
  name: string | null;
}

export interface Notice {
  id: number;
  date: string | null; 
  notice_title: string | null;
  notice_description: string | null;
  expire_date: string | null;
  file_attached: string | null;
  academic_year: AcademicYear;
  created_at: string | null;
  updated_at: string | null;
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

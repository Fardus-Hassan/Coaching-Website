import { apiSlice } from "../apiSlice";

export interface IconicStudent {
  id: number;
  student_name: string | null;
  image: string | null;
  title: string | null;
  description: string | null;
}

export const iconicStudentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIconicStudents: builder.query<IconicStudent[], void>({
      query: () => "iconic-students/",
      providesTags: ["IconicStudents"],
    }),
  }),
});

export const { useGetIconicStudentsQuery } = iconicStudentsApi;

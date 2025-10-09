import { apiSlice } from "../apiSlice";

export interface IconicStudent {
  id: number;
  student_name: string;
  image: string;
  title: string;
  description: string;
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

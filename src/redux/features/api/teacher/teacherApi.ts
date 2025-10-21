import { apiSlice } from "../apiSlice";

export interface Teacher {
  id: number;
  phone_number: string;
  name: string;
  avatar: string;
  designation: string;
}

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<Teacher[], void>({
      query: () => "teachers/",
      providesTags: ["Teacher"],
    }),
  }),
});

export const { useGetTeachersQuery } = teacherApi;

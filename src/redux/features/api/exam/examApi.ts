import { apiSlice } from "../apiSlice";

export interface Exam {
  id: number;
  name: string;
  date: string;
}

export const examApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExams: builder.query<Exam[], { search?: string; name?: string } | void>({
      query: (params) => {
        let url = "exams/";
        if (params) {
          const queryParams = new URLSearchParams();
          if (params.search) queryParams.append("search", params.search);
          if (params.name) queryParams.append("name", params.name);
          url += `?${queryParams.toString()}`;
        }
        return url;
      },
      providesTags: ["Exam"],
    }),

    downloadReportCard: builder.mutation<Blob, { student_id: string; exam_id: number }>({
      query: ({ student_id, exam_id }) => ({
        url: `report-card/download/?student_id=${student_id}&exam_id=${exam_id}`,
        method: "GET",
        responseHandler: async (response) => response.blob(),
      }),
    }),
  }),
});

export const { useGetExamsQuery, useDownloadReportCardMutation } = examApi;

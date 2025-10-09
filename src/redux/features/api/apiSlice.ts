import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coaching.attendclub.top/api/",
  }),
  tagTypes: ["Institute", "Banner", "Notice", "Gallery", "Contact", "VideoGallery", "IconicStudents"],
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // unique key
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coaching.attendclub.top/api/", // ✅ এক central জায়গায় base URL
  }),
  tagTypes: ["Institute", "Banner"],
  endpoints: () => ({}),
});

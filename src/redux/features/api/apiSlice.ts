import baseUrl from "../../../../apiConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl(),
  }),
  tagTypes: [
    "Institute",
    "Banner",
    "Notice",
    "Gallery",
    "Contact",
    "VideoGallery",
    "IconicStudents",
    "Service",
    "CoachingHistory",
    "SuccessStories",
    "SpecialQualities",
    "Speech",
    "Program",
    "Committee",
    "AdmissionYear",
    "StudentClass",
    "Batch",
    "OnlineAdmission",
    "InfoBlock",
    "Teacher",
    "SiteColor",
    "Exam",
  ],
  endpoints: () => ({}),
});

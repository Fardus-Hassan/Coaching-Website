import { apiSlice } from "../apiSlice";

export interface ContactInfo {
  id: number;
  text: string | null;
  office_address: string | null;
  mobile: string | null;
  email: string | null;
  google_map: string | null;
  image: string | null;
  status: string | null;
}

export interface ContactMessagePayload {
  name: string;
  phone_number: string;
  email: string;
  subject: string;
  msg: string;
}

export interface ContactMessageResponse {
  id?: number;
  success?: boolean;
  message?: string;
}

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContactInfo: builder.query<ContactInfo[], void>({
      query: () => "contacts/",
      providesTags: ["Contact"],
    }),

    sendContactMessage: builder.mutation<
      ContactMessageResponse,
      ContactMessagePayload
    >({
      query: (newMessage) => ({
        url: "contact-messages/",
        method: "POST",
        body: newMessage,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const { useGetContactInfoQuery, useSendContactMessageMutation } =
  contactApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Auth", "User", "Admin"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    adminLogin: builder.mutation({
      query: (payload) => ({
        url: "/auth/admin-login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Auth"],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // Payment-related endpoints
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/payment/create-order",
        method: "POST",
        body: payload,
      }),
    }),
    verifyPayment: builder.mutation({
      query: (payload) => ({
        url: "/payment/verify-payment",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getPaymentDetails: builder.query({
      query: (paymentId) => ({
        url: `/payment/payment/${paymentId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserPayments: builder.query({
      query: () => ({
        url: "/payment/my-payments",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getMyPurchasedServices: builder.query({
      query: () => ({
        url: "/profile/my-services",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAdminLoginMutation,
  useGetMyProfileQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useGetPaymentDetailsQuery,
  useGetUserPaymentsQuery,
  useGetMyPurchasedServicesQuery,
} = api;

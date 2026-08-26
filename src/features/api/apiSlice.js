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
  tagTypes: ["Auth", "User", "Admin", "Users", "Analytics", "Bookings", "Services", "Transactions"],
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
    // Additional endpoints for admin functionalities can be added here
    getAnalytics: builder.query({
      query: () => "/admin/analytics",
      providesTags: ["Analytics"],
    }),
    // Users
    getUsers: builder.query({
      query: ({ page = 1, search = "", role = "" } = {}) =>
        `/admin/users?page=${page}&search=${encodeURIComponent(search)}&role=${encodeURIComponent(role)}`,
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users", "Analytics"],
    }),
    // Bookings
    getBookings: builder.query({
      query: ({ page = 1, status = "", paymentStatus = "" }) =>
        `/admin/bookings?page=${page}&status=${encodeURIComponent(status)}&paymentStatus=${encodeURIComponent(paymentStatus)}`,
      providesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/bookings/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Bookings", "Analytics"],
    }),
    // Services Catalog
    getServices: builder.query({
      query: () => "/admin/services",
      providesTags: ["Services"],
    }),
    createService: builder.mutation({
      query: (body) => ({
        url: "/admin/services",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services", "Analytics"],
    }),
    updateService: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/services/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/admin/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services", "Analytics"],
    }),
    // Transactions
    getTransactions: builder.query({
      query: () => "/admin/transactions",
      providesTags: ["Transactions"],
    }),
    // admin profile
    getProfile: builder.query({
      query: () => "/admin/me",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            const STORAGE_KEY = "sathi-meet-auth-session";
            const LEGACY_STORAGE_KEY = "spark-auth-session";
            const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
            if (stored) {
              const session = JSON.parse(stored);
              session.user = { ...session.user, ...data.user };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
            }
          }
        } catch {
          // Mutation error will be handled by the UI component
        }
      },
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/admin/change-password",
        method: "PUT",
        body: passwords,
      }),
      invalidatesTags: ["User"],
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

  // admin hooks
  useGetAnalyticsQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetTransactionsQuery,
  // Admin profile
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = api;

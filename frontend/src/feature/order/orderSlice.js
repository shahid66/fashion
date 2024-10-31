import { apiSlice } from "./../api/apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    orderRegister: builder.mutation({
      query: (data) => ({
        url: "/api/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: "Order",
    }),
    getOrders: builder.query({
      query: () => ({
        url: "/api/orders",
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
      }),
      providesTags: ["Order"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useOrderRegisterMutation, useGetOrderQuery, useGetOrdersQuery } =
  orderSlice;

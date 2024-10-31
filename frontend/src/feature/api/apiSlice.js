import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fashion-b70x.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});

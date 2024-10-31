import { apiSlice } from "./../api/apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/users/login",
        method: "POST",
        body: data,
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/api/users/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/api/users/profile",
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useLogOutMutation,
  useLoginMutation,
  useRegisterMutation,
} = userSlice;

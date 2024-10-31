import { apiSlice } from "./../api/apiSlice";

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    productRegister: builder.mutation({
      query: (data) => ({
        url: "/api/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/uploads`,
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["Product"],
    }),
    getProducts: builder.query({
      query: ({
        categories = [],
        subcategories = [],
        minPrice,
        maxPrice,
        sortOrder,
      }) => ({
        url: "/api/products",
        params: {
          categories: categories.join(","),
          subcategories: subcategories.join(","),
          minPrice,
          maxPrice,
          sortOrder,
        },
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/api/products/${id}`,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useProductRegisterMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productSlice;

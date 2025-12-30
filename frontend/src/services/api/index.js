import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    // user get query
    getUser: builder.query({
      query: () => "/users/",
      providesTags: ["USER"],
    }),
  }),
  // endpoints: EndPointMethods,
});

export const { useGetUserQuery } = api;

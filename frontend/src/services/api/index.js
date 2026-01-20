import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL || "http://localhost:5000/api";
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    // credentials: "include",
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

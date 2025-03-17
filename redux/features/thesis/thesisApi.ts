import { apiSlice } from "../api/apiSlice";

export const thesisApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadThesis: builder.mutation({
      query: ({ title, advisor, author_id, file, major }) => ({
        url: "/thesis",
        method: "POST",
        body: {
          title,
          advisor,
          author_id,
          file,
          major,
        },
        credentials: "include" as const,
      }),
    }),
    deleteThesis: builder.mutation({
      query: ({ id }) => ({
        url: `/thesis/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getThesisById: builder.query({
      query: ({ id }) => ({
        url: `/thesis/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    searchThesis: builder.query({
      query: ({ title, major }) => ({
        url: `/thesis/search/${major}?title=${title}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUploadThesisMutation,
  useDeleteThesisMutation,
  useGetThesisByIdQuery,
  useSearchThesisQuery,
} = thesisApi;

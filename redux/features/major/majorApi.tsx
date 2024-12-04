import { apiSlice } from "../api/apiSlice";

export const majorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllMajor: builder.query({
      query: () => ({
        url: "get-all-major",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createMajor: builder.mutation({
      query: ({ name }) => ({
        url: "major-create",
        method: "POST",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updateMajor: builder.mutation({
      query: ({ id, name }) => ({
        url: `major-update/${id}`,
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    deleteMajor: builder.mutation({
      query: ({ id }) => ({
        url: `major-delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllMajorQuery,
  useCreateMajorMutation,
  useUpdateMajorMutation,
  useDeleteMajorMutation,
} = majorApi;

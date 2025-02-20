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
      query: ({ name, program }) => ({
        url: "major-create",
        method: "POST",
        body: { name, program },
        credentials: "include" as const,
      }),
    }),
    updateMajor: builder.mutation({
      query: ({ id, name, program }) => ({
        url: `major-update/${id}`,
        method: "PUT",
        body: { name, program },
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
    getMajorById: builder.query({
      query: ({ id }) => ({
        url: `major-by-id/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    searchMajor: builder.query({
      query: ({ name, page, limit }) => ({
        url: `major-search?name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
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
  useGetMajorByIdQuery,
  useSearchMajorQuery,
} = majorApi;

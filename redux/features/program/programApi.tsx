import { apiSlice } from "../api/apiSlice";

export const programApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProgram: builder.query({
      query: () => ({
        url: "get-all-program",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createProgram: builder.mutation({
      query: ({ name }) => ({
        url: "program-create",
        method: "POST",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    updateProgram: builder.mutation({
      query: ({ id, name }) => ({
        url: `program-update/${id}`,
        method: "PUT",
        body: { name },
        credentials: "include" as const,
      }),
    }),
    deleteProgram: builder.mutation({
      query: ({ id }) => ({
        url: `program-delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllProgramQuery,
  useCreateProgramMutation,
  useUpdateProgramMutation,
  useDeleteProgramMutation,
} = programApi;

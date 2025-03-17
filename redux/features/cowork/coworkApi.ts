import { apiSlice } from "../api/apiSlice";

export const coworkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCowork: builder.mutation({
      query: (data) => ({
        url: "/cowork-create",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    listCowork: builder.query({
      query: () => ({
        url: "/list-all-cowork",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateCowork: builder.mutation({
      query: ({ id, data }) => ({
        url: `/cowork-update/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    deleteCowork: builder.mutation({
      query: ({ id }) => ({
        url: `/cowork-delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    searchCowork: builder.query({
      query: ({ keywords }) => ({
        url: `/search-cowork?keywords=${keywords}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCoworkMutation,
  useListCoworkQuery,
  useUpdateCoworkMutation,
  useDeleteCoworkMutation,
  useSearchCoworkQuery,
} = coworkApi;

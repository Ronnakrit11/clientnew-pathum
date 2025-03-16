import { apiSlice } from "../api/apiSlice";

export const sectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSect: builder.query({
      query: ({ name, limit, page }) => ({
        url: `/sect/get-all-sect?name=${name}&limit=${limit}&page=${page}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createSect: builder.mutation({
      query: ({ name, major }) => ({
        url: "/sect/create",
        method: "POST",
        body: { name, major },
        credentials: "include" as const,
      }),
    }),
    updateSect: builder.mutation({
      query: ({ id, name, major }) => ({
        url: `/sect/update/${id}`,
        method: "PUT",
        body: { name, major },
        credentials: "include" as const,
      }),
    }),
    deleteSect: builder.mutation({
      query: ({ id }) => ({
        url: `/sect/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getSectByMajor: builder.query({
      query: ({ major }) => ({
        url: `/sect/get-by-major/${major}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllSecAll: builder.query({
      query: () => ({
        url: `/sect/getall`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllSectQuery,
  useCreateSectMutation,
  useUpdateSectMutation,
  useDeleteSectMutation,
  useGetSectByMajorQuery,
  useGetAllSecAllQuery,
} = sectApi;

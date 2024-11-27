import { apiSlice } from "../api/apiSlice";

const establishmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEstablishment: builder.mutation({
      query: (body) => ({
        url: "/create-establishment",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
    }),
    updateEstablishment: builder.mutation({
      query: (data) => ({
        url: `/update-establishment/${data.id}`,
        method: "PUT",
        body:data,
        credentials: "include" as const,
      }),
    }),
    deleteEstablishment: builder.mutation({
      query: (id) => ({
        url: `/delete-establishment/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getAllEstablishments: builder.query({
      query: ({name, major}) => ({
        url: `/get-all-establishments?name=${name}&major=${major}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getEstablishmentById: builder.query({
      query: (id) => ({
        url: `/get-establishment-by-id/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateEstablishmentMutation,
  useUpdateEstablishmentMutation,
  useDeleteEstablishmentMutation,
  useGetAllEstablishmentsQuery,
  useGetEstablishmentByIdQuery,
} = establishmentApi;

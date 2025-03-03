import { apiSlice } from "../api/apiSlice";

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeacher: builder.query({
      query: ({ id, name, page, limit, dateStart, dateEnd }) => ({
        url: `/teacher/list-all?id=${id}&name=${name}&page=${page}&limit=${limit}&dateStart=${dateStart}&dateEnd=${dateEnd}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createTeacher: builder.mutation({
      query: ({
        name,
        sirName,
        phoneNumber,
        email,
        type,
        typeDate,
        note,
        prefix,
        major,
      }) => ({
        url: "/teacher/create",
        method: "POST",
        body: {
          name,
          sirName,
          phoneNumber,
          email,
          type,
          typeDate,
          note,
          prefix,
          major,
        },
        credentials: "include" as const,
      }),
    }),
    updateTeacher: builder.mutation({
      query: ({
        id,
        name,
        sirName,
        phoneNumber,
        email,
        type,
        typeDate,
        note,
        prefix,
      }) => ({
        url: `/teacher/update/${id}`,
        method: "PUT",
        body: {
          name,
          sirName,
          phoneNumber,
          email,
          type,
          typeDate,
          note,
          prefix,
        },
        credentials: "include" as const,
      }),
    }),
    deleteTeacher: builder.mutation({
      query: ({ id }) => ({
        url: `/teacher/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getAllTeacherUser: builder.query({
      query: () => ({
        url: `/teacher/get-all-user`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllTeacherQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
  useGetAllTeacherUserQuery,
} = teacherApi;

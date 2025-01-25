import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "update-user-avatar",
        method: "PUT",
        body: { avatar },
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: ({ name }) => ({
        url: "update-user-info",
        method: "PUT",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: "add-user",
        method: "POST",
        body,
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: `${window.location.origin}/update-user-password`,
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "get-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role, id_admin }) => ({
        url: "update-user",
        method: "PUT",
        body: { email, role, id_admin },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addCourseToUser: builder.mutation({
      query: ({ user_id, course_id, expireDate }) => ({
        url: "/add-course-user",
        method: "POST",
        body: {
          user_id,
          course_id,
          expireDate,
        },
        credentials: "include" as const,
      }),
    }),
    updateCourseToUser: builder.mutation({
      query: ({ user_id, course_id, expireDate }) => ({
        url: "/update-course-user",
        method: "POST",
        body: {
          user_id,
          course_id,
          expireDate,
        },
        credentials: "include" as const,
      }),
    }),
    searchUserByName: builder.query({
      query: ({ name, page, limit, role }) => ({
        url: `search-user-by-name?name=${name}&page=${page}&limit=${limit}&role=${role}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserById: builder.mutation({
      query: (data) => ({
        url: `update-user-by-id/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    readUserById: builder.query({
      query: (id) => ({
        url: `read-user-by-id/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    allUserEngineerAndIT: builder.query({
      query: ({ name, page, limit }) => ({
        url: `get-user-all-engineer-and-it?name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    allUserArgTech: builder.query({
      query: ({ name, page, limit }) => ({
        url: `get-user-all-arg-tech?name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    allTechInnovation: builder.query({
      query: ({ name, page, limit }) => ({
        url: `get-user-all-tech-innovation?name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    allInterdisciplinary: builder.query({
      query: ({ name, page, limit }) => ({
        url: `get-user-all-interdisciplinary?name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    uploadThesis: builder.mutation({
      query: (data) => ({
        url: `upload-thesis`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllUserSuccess: builder.query({
      query: ({ name, major, page, limit }) => ({
        url: `get-all-user-success?major=${major}&name=${name}&page=${page}&limit=${limit}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createAdminMajor: builder.mutation({
      query: (data) => ({
        url: `create-admin-major`,
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    listUserByMajor: builder.query({
      query: ({
        major,
        page,
        limit,
        dateEnd,
        dateStart,
        status,
        name,
        studentId,
        createdAt,
      }) => ({
        url: `list-user-by-major?major=${major}&page=${page}&limit=${limit}&dateEnd=${dateEnd}&dateStart=${dateStart}&status=${status}&name=${name}&studentId=${studentId}&createdAt=${createdAt}`,

        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: "get-all-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateAvatarAdmin: builder.mutation({
      query: ({ id, avatar }) => ({
        url: `update-avatar-admin`,
        method: "PUT",
        body: { avatar, id },
        credentials: "include" as const,
      }),
    }),
    appointAdminCreate: builder.query({
      query: () => ({
        url: `appoint-admin-create`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useUpdateAvatarMutation,
  useEditProfileMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useAddCourseToUserMutation,
  useAddUserMutation,
  useUpdateCourseToUserMutation,
  useSearchUserByNameQuery,
  useUpdateUserByIdMutation,
  useReadUserByIdQuery,
  useAllUserEngineerAndITQuery,
  useAllUserArgTechQuery,
  useAllTechInnovationQuery,
  useAllInterdisciplinaryQuery,
  useUploadThesisMutation,
  useGetAllUserSuccessQuery,
  useCreateAdminMajorMutation,
  useListUserByMajorQuery,
  useGetAllAdminQuery,
  useUpdateAvatarAdminMutation,
  useAppointAdminCreateQuery,
} = userApi;

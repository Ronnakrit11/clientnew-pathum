import { apiSlice } from "../api/apiSlice";

export const logsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLogs: builder.query({
      query: ({ id ,startDate, endDate }) => ({
        url: `get-all-logs?id=${id}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllAdminLogs: builder.query({
      query: () => ({
        url: "get-all-admin-logs",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllLogsQuery, useGetAllAdminLogsQuery } = logsApi;

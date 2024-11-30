import { apiSlice } from "../api/apiSlice";

export const logsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLogs: builder.query({
      query: () => ({
        url: "get-all-logs",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllLogsQuery } = logsApi;

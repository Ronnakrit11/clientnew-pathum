import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (type) => ({
        url: `get-layout/${type}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories, imageList, importance, objective, consultant }) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
          imageList,
          importance,
          objective,
          consultant,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery,useEditLayoutMutation } = layoutApi;

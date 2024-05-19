import { apiService } from "../service/ApiService";

const contactEndPoints = apiService.injectEndpoints({
    endpoints : (builder) => ({
        create : builder.mutation({
            query : (data) => ({
                url : "contact",
                body : data,
                method : "POST"
            }),
            invalidatesTags : ["contact"]
        }),
        get : builder.query({
            query : () => "contact",
            providesTags : ["contact"]
        }),
        delete: builder.mutation({
            query: (data) => ({
              url: `contact/${data}`,
              method: "DELETE",
            }),
            invalidatesTags: ["contact"],
          }),
          update: builder.mutation({
            query: (data) => ({
              url: `contact/${data.id}`,
              method: "PUT",
              body: data,
            }),
            invalidatesTags: ["contact"],
          }),
    })
});
export const {useCreateMutation, useGetQuery, useDeleteMutation, useUpdateMutation} = contactEndPoints;
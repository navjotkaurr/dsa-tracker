import { PROGRESS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const progressApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // PATCH markstatus
        markComplete: builder.mutation({
            query: (problemId) => ({
                url: `${PROGRESS_URL}/${problemId}`,
                method: 'PATCH'
            }),
            invalidatesTags: ['Problems']
        })
    })
})

export const {
    useMarkCompleteMutation,
} = progressApiSlice
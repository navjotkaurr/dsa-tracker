import { TOPICS_URL } from "../../constants";
import { apiSlice } from "./apiSlice";

export const topicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // GET all topics (public)
        getTopics: builder.query({
            query: () => ({
                url: `${TOPICS_URL}`,
            }),
            providesTags: ["Topic"],
        }),

        
        // POST new topic (admin only)
        createTopic: builder.mutation({
            query: (data) => ({
                url: `${TOPICS_URL}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Topic"],
        }),

        // PATCH Problem completion toggle (loggedin user)
        toggleProblemStatus: builder.mutation({
            query: (problemId) => ({
                url: `${TOPICS_URL}/problem/${problemId}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Topic"],
        })
    })
})

export const {
    useGetTopicsQuery,
    useCreateTopicMutation,
    useToggleProblemStatusMutation,

} = topicApiSlice
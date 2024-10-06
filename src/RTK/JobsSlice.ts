import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Skill {
    id: string;
    name: string;
}

// export interface Job {
//     relationships: {
//         skills: Skill[];
//     };
//     attributes?: {
//         title: string;
//     };
// }

interface JobState {
    jobs: [] | null;
    loading: boolean;
    error: string | null;
    Query: string
}

const initialState: JobState = {
    jobs: null,
    loading: false,
    error: null,
    Query: ""
};

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async () => {
        const response = await axios.get("https://skills-api-zeta.vercel.app/jobs");
        return response.data.data.jobs;
    }
);

export const fetchJobsQuery = createAsyncThunk(
    'jobs/fetchJobsQuery',
    async (Value: string) => {
        const response = await axios.get(`https://skills-api-zeta.vercel.app/jobs/search?query=${Value}`);
        return response.data.data.jobs;
    }
);

const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        GetQuery: (state, action) => {
            state.Query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.loading = false;
                console.log(state.jobs)
            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "There's no Job";
            });

        builder
            .addCase(fetchJobsQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchJobsQuery.fulfilled, (state, action) => {
                state.jobs = action.payload;
                state.loading = false;
                console.log(state.jobs)
            })
            .addCase(fetchJobsQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "There's no Job";
            });
    },
});
export const { GetQuery } = jobsSlice.actions;
export default jobsSlice.reducer;

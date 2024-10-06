import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Skill {
    id: string;
    name: string;
}

export interface Job {
    relationships: {
        skills: Skill[];
    };
    attributes?: {
        title: string;
    };
}

interface JobState {
    job: Job | null;
    loading: boolean;
    error: string | null;
}

const initialState: JobState = {
    job: null,
    loading: false,
    error: null,
};

export const fetchJob = createAsyncThunk<Job, string>(
    'job/fetchJob',
    async (id: string) => {
        const response = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
        return response.data.data.job;
    }
);

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.job = action.payload;
                state.loading = false;
            })
            .addCase(fetchJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'فشل في جلب البيانات';
            });
    },
});

export default jobSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Skill {
  id: string;
  name: string;
}

interface JobState {
  jobs: [] | null;
  loading: boolean;
  error: string | null;
  Query: string;
}

const initialState: JobState = {
  jobs: null,
  loading: false,
  error: null,
  Query: "",
};

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (_, { getState }) => {
    const state = getState() as { jobs: JobState }; // الحصول على الحالة الحالية
    const query = state.jobs.Query; // استخراج الـ Query من الحالة

    // تحقق إذا كانت الـ Query فارغة
    if (query === "") {
      const response = await axios.get(
        "https://skills-api-zeta.vercel.app/jobs"
      );
      return response.data.data.jobs;
    } else {
      const response = await axios.get(
        `https://skills-api-zeta.vercel.app/jobs/search?query=${query}`
      );
      return response.data.data.jobs;
    }
  }
);

export const fetchJobsQuery = createAsyncThunk(
  "jobs/fetchJobsQuery",
  async (value: string) => {
    const response = await axios.get(
      `https://skills-api-zeta.vercel.app/jobs/search?query=${value}`
    );
    return response.data.data.jobs;
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    GetQuery: (state, action) => {
      state.Query = action.payload;
    },
    ClearQuery: (state) => {
      state.Query = "";
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
        console.log(state.jobs);
      })
      .addCase(fetchJobsQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "There's no Job";
      });
  },
});

export const { GetQuery, ClearQuery } = jobsSlice.actions;
export default jobsSlice.reducer;

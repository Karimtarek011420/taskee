import { configureStore } from '@reduxjs/toolkit';
import  jobReducer from './jobSlice'
import  jobsReducer  from './JobsSlice'
const store = configureStore({
    reducer: {
        job: jobReducer,
        jobs: jobsReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export default store;

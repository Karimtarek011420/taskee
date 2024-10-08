import { configureStore } from '@reduxjs/toolkit';
import  jobReducer from './jobSlice'
import  jobsReducer  from './JobsSlice'
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        job: jobReducer,
        jobs: jobsReducer,
        search: searchReducer,

    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

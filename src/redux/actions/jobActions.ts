import axios from 'axios';

export const fetchJobs = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get('https://skills-api-zeta.vercel.app/jobs?cursor=0&limit=32');
    dispatch({ type: 'FETCH_JOBS_SUCCESS', payload: data.data.jobs });
  } catch (error:any) {
    dispatch({ type: 'FETCH_JOBS_FAILURE', payload: error.message });
  }
};

export const fetchJob = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`https://skills-api-zeta.vercel.app/job/${id}`);
    dispatch({ type: 'FETCH_JOB_SUCCESS', payload: data });
  } catch (error:any) {
    dispatch({ type: 'FETCH_JOB_FAILURE', payload: error.message });
  }
};

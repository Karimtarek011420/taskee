const initialState = {
    jobs: [],
    job: null,
    loading: false,
    error: null,
  };
  
  export const jobReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_JOBS_SUCCESS':
        return { ...state, jobs: action.payload };
      case 'FETCH_JOB_SUCCESS':
        return { ...state, job: action.payload };
      case 'FETCH_JOBS_FAILURE':
      case 'FETCH_JOB_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
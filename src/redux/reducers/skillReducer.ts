const initialState = {
    skill: null,
    loading: false,
    error: null,
  };
  
  export const skillReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'FETCH_SKILL_SUCCESS':
        return { ...state, skill: action.payload };
      case 'FETCH_SKILL_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
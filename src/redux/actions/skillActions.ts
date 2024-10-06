import axios from 'axios';

export const fetchSkill = (id: string) => async (dispatch: any) => {
  try {
    const { data } = await axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`);
    dispatch({ type: 'FETCH_SKILL_SUCCESS', payload: data });
  } catch (error:any) {
    dispatch({ type: 'FETCH_SKILL_FAILURE', payload: error.message });
  }
};

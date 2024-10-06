import axios from 'axios';

export const getSkill = (id: string) => {
  return axios.get(`https://skills-api-zeta.vercel.app/skill/${id}`);
};

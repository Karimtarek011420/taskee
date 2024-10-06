import axios from 'axios';

const API_BASE_URL = 'https://skills-api-zeta.vercel.app';

export const getJobs = async (cursor: number = 0, limit: number = 12) => {
  const response = await axios.get(`${API_BASE_URL}/jobs`, {
    params: { cursor, limit },
  });
  return response.data;
};

export const searchJobs = async (query: string) => {
  const response = await axios.get(`${API_BASE_URL}/jobs/search`, {
    params: { query },
  });
  return response.data;
};

export const getJobById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/job/${id}`);
  return response.data;
};


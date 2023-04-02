import axios from "axios";
const URL = process.env.REACT_APP_NODE_URL;
const api = axios.create({
  baseURL: URL,
});

export const createNote = async (noteData, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await api.post(`/tickets/${id}/notes`, noteData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getNotes = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get(`/tickets/${id}/notes`, config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

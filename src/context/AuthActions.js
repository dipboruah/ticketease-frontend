import axios from "axios";
const URL = process.env.REACT_APP_NODE_URL;
const api = axios.create({
  baseURL: URL,
});

export const register = async (user) => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const login = async (user) => {
  try {
    const response = await api.post("/users/login", user);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

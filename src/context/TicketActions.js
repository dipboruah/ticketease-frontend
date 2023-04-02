import axios from "axios";
const URL = process.env.REACT_APP_NODE_URL;
const api = axios.create({
  baseURL: URL,
});

export const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.post("/tickets", ticketData, config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const update = async (ticket, token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.put(`/tickets/${id}`, ticket, config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get("/tickets", config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getTicket = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.get(`/tickets/${id}`, config);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const closeTicket = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await api.put(
      `/tickets/${id}`,
      { status: "closed" },
      config
    );
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

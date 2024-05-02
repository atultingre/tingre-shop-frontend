import axios from "axios";
import { toast } from "react-toastify";

const api = async (method, url, data = null, headers = {}) => {
  try {
    // const apiUrl = `http://localhost:8000/api${url}`;
    const apiUrl = `https://tingre-shop-backend.onrender.com/api${url}`;

    const config = {
      method,
      url: apiUrl,
      headers,
      data,
    };

    const response = await axios(config);
    const { message } = response?.data;
    toast.success(message);
    return response?.data;
  } catch (error) {
    const { message } = error?.response?.data;
    toast.error(message);
    throw error?.response;
  }
};

export default api;

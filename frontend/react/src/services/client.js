import axios from "axios";

export const getCustomers = async () => {
  return await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`);
};

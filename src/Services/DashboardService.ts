
import axios from "axios";
import { API_BASE } from "../Config/Env";

export const getDashboardSummary = async () => {
  const response = await axios.get(`${API_BASE}/dashboard/summary`);
  return response.data;
};



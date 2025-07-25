import axios from "axios";
import { API_BASE } from "../Config/Env";

export const testBackendConnection = async () => {
  try {
    const response = await axios.get(`${API_BASE.replace('/api', '')}/health`);
    return {
      success: true,
      message: "Backend connected successfully",
      data: response.data
    };
  } catch (error) {
    console.error('Backend connection failed:', error);
    return {
      success: false,
      message: "Backend connection failed",
      error: error
    };
  }
};

export const testCampaignEndpoint = async () => {
  try {
    const response = await axios.get(`${API_BASE}/campaigns`);
    return {
      success: true,
      message: "Campaign endpoint working",
      data: response.data
    };
  } catch (error) {
    console.error('Campaign endpoint test failed:', error);
    return {
      success: false,
      message: "Campaign endpoint failed",
      error: error
    };
  }
}; 
import axios from "axios";

const API_BASE = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export const fetchCrimes = async (filters) => {
  try {
    const response = await api.get("/crimes", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch crimes:", error);
    return [];
  }
};

export const addCrime = async (crimeData) => {
  try {
    const response = await api.post("/crimes", crimeData);
    return response.data;
  } catch (error) {
    console.error("Failed to add crime:", error);
    throw error;
  }
};

export const fetchPredictions = async () => {
  try {
    const response = await api.get("/predict");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch predictions:", error);
    return null;
  }
};

export default api;

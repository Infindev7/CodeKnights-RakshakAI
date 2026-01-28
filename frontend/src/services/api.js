import axios from "axios";

// Toggle this to true when you have a real backend
const USE_REAL_API = false;
const API_BASE = "http://localhost:8000";

const MOCK_DATA = [
  {
    id: 1,
    type: "Theft",
    lat: 19.076,
    lng: 72.8777,
    date: "2023-10-25T14:30:00",
    location: "Bandra West",
    severity: "Low",
  },
  {
    id: 2,
    type: "Assault",
    lat: 19.08,
    lng: 72.88,
    date: "2023-10-24T09:15:00",
    location: "Andheri East",
    severity: "High",
  },
  {
    id: 3,
    type: "Accident",
    lat: 19.07,
    lng: 72.86,
    date: "2023-10-26T18:45:00",
    location: "Dadar",
    severity: "Medium",
  },
  {
    id: 4,
    type: "Theft",
    lat: 19.085,
    lng: 72.89,
    date: "2023-10-25T20:00:00",
    location: "Kurla",
    severity: "Low",
  },
  {
    id: 5,
    type: "Vandalism",
    lat: 19.072,
    lng: 72.87,
    date: "2023-10-27T11:00:00",
    location: "Mahim",
    severity: "Low",
  },
];

export const fetchCrimes = async (filters) => {
  if (!USE_REAL_API) {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_DATA), 500);
    });
  }
  const response = await axios.get(`${API_BASE}/crimes`, { params: filters });
  return response.data;
};

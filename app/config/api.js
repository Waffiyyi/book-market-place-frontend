import axios from "axios";

export const API_URL = "http://localhost:8015";

export const api = axios.create(
    {
        baseURL: `${API_URL}/api`,
        headers:{
            "Content-Type": "application/json",
        }
    }
)
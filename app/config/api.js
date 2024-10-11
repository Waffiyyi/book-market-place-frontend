import axios from "axios";

export const API_URL = "https://simple-rasia-waffiyyidev-5e895312.koyeb.app";
export const API_URL_LOCAL = "http://localhost:8015";

export const api = axios.create(
    {
        baseURL: `${API_URL}/api`,
        headers:{
            "Content-Type": "application/json",
        }
    }
)
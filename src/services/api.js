import axios from "axios";

export const api = axios.create({
    baseURL: "https://rocket-notes-api-r4zn.onrender.com"
})
import axios from "axios";

const API = axios.create({
  baseURL: "https://campuscare-backend-7rws.onrender.com",
});

export default API;
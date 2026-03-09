import axios from "axios";

const API = axios.create({
  baseURL: "https://thriftstore-backend.onrender.com/api/",
});

export default API;
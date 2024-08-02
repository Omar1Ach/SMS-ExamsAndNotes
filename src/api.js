import axios from "axios";
const ApiManager = axios.create({
  baseURL: "https://localhost:7043",
  responseType: "json",
  withCredentials: false,
});

export default ApiManager;

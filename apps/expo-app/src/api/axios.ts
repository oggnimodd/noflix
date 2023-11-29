import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://themealdb.com/api/json/v1/1/",
});

export default axiosInstance;

import axios from "axios";

const baseURL = "https://wizard-world-api.herokuapp.com/";

const api = axios.create({
  baseURL,
});

export default api;

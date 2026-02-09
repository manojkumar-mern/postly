import axios from "axios";

const baseURL = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/posts";

export default axios.create({
  baseURL,
});

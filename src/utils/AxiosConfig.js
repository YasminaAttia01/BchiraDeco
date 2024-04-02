import axios from "axios";
export const backLink = "https://vente-back.onrender.com";

const axiosConfig = axios.create({
    baseURL: "https://vente-back.onrender.com/api",
});
export default axiosConfig
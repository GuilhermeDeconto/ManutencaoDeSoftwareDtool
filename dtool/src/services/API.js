import axios from "axios";
import { API_HOST } from "react-native-dotenv";

console.log("api", API_HOST);
export default axios.create({
  baseURL: API_HOST,
  responseType: "json",
});

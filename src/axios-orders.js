import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burgerbuilder-9ff2f-default-rtdb.firebaseio.com/",
});
export default instance;

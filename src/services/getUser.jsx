import axios from "axios";


const getUser = axios.create({
  baseURL: "http://localhost:3000/api/v1/user",
});

export default getUser;

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  //baseURL: "https://fierce-ravine-63801.herokuapp.com/",
});

export default instance;

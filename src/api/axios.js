import axios from "axios";

export default axios.create({
  // for local use
  baseURL: `http://localhost:8000`,
  // for nginx use
  // baseURL: `https://www.assembo.cc/app/apis/`,
});

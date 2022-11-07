import axios from "axios";
import utility from "./utility.service";

const { promised } = utility();

axios.interceptors.request.use(
  function (config) {
    config.url = `${process.env.API}/api/${config.url}`;
    config["Content-Type"] = config["Content-Type"] || "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    promised.emit("api-done", "arg1 value", "arg2 value", "arg3 value");
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default function $axios() {
  return axios;
}

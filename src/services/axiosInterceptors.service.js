import axios from "axios";
import eventBus from "./eventBus.service";

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
    eventBus.emit("api-done", "Request completed!", "arg2 value", "arg3 value");
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default function $axios() {
  return axios;
}

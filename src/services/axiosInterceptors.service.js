import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.url = `${process.env.API}/api/${config.url}`;
    config["content-type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default function $axios() {
  return axios;
}

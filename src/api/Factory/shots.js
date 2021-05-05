import axiosClient from "@/api/index";

const shotsApi = {
  get: (params) => {
    return axiosClient.get("/shots", { params });
  },
};

export default shotsApi;

import axiosClient from "@/api/index";

const categoryApi = {
  get: (params) => {
    return axiosClient.get("/categories", { params });
  },
};

export default categoryApi;

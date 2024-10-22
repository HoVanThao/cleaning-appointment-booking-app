import axiosClient from "../utils/customFetch";

const companyAPI = {
    getListCompany: (page) => {
        const url = `/company?page=${page}&limit=9`;
        return axiosClient.application.get(url);
    },
    getCompanyDetails: (companyId) => {
        const url = `/company/${companyId}`; // Đường dẫn tới API chi tiết công ty
        return axiosClient.application.get(url);
      },
};

export default companyAPI;
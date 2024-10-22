import axiosClient from "../utils/customFetch";

const companyAPI = {
    getListCompany: (page) => {
        const url = `/company?page=${page}&limit=9`;
        return axiosClient.application.get(url);
    },
    getDetailCompany: (company_id) => {
        const url = `/company/${company_id}`;
        return axiosClient.application.get(url);
    },
};

export default companyAPI;
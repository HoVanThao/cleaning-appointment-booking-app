import axiosClient from "../utils/customFetch";

const companyAPI = {
    getListCompany: (page) => {
        const url = '/company';
        return axiosClient.applicationNoAuth.get(url, { page: page, limit: 9 });
    },
};

export default companyAPI;
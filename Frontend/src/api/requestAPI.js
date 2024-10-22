import axiosClient from '../utils/customFetch';

const RequestAPI = {
  createRequest: (formData) => {
    const url = `/requests`;
    return axiosClient.application.post(url, formData);
  },
};

export default RequestAPI;
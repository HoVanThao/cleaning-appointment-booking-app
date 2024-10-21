import axiosClient from '../utils/customFetch';

const LoginAPI = {
  login: (formData) => {
    const url = `/auth/login`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
};

export default LoginAPI;
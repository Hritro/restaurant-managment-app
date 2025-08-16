import React from 'react';
import axios from 'axios'
const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})
const useAxiosSecure = () => {
    return axiosPublic
};

export default useAxiosSecure;
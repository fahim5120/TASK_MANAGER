import axios from "axios"



const url = import.meta.env.VITE_BASE_URL

const axiosInstance=axios.create({
    baseURL:url,                                //"http://localhost:1000/api/v1"
    withCredentials:true
})

export default axiosInstance
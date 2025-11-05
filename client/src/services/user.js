import axiosInstance from "../axios/axiosinstance";


export const signUp=(data)=>{
      return axiosInstance.post("/register",data)
}
export const login=(data)=>{
      return axiosInstance.post("/login",data)
}
export const logout=()=>{
      return axiosInstance.post("/logout")
}


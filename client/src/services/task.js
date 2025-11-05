import axiosInstance from "../axios/axiosinstance";




export const AddtaskOne=(data)=>{
      return axiosInstance.post("/addTask",data)
}
export const getUserDetail=()=>{
      return axiosInstance.get("/userDetails")
}
export const getTask = (id) => {
  return axiosInstance.get(`/getTask/${id}`);
};

export const Edit_Task = (id, data) => {
  return axiosInstance.put(`/editTask/${id}`, data);
};

export const Delete_Task = (id) => {
  return axiosInstance.delete(`/deleteTask/${id}`);
};




// export const signUp=(data)=>{
//       return axiosInstance.post("/register",data)
// }
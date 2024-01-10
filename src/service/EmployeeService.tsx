import axios from "axios";
const Rest_API_Base_URL='http://localhost:8080/demo'
export const listEmployees = () => axios.get(Rest_API_Base_URL+'/all')  ;
export const createUser = (user: any) => axios.post(Rest_API_Base_URL+'/add',user);
export const updateUser = (user:any,id:any) => axios.put(Rest_API_Base_URL+'/'+id,user);
export const getUser = (id: any) => axios.get(Rest_API_Base_URL+'/'+id);
export const deleteUser = (id: any) => axios.delete(Rest_API_Base_URL+'/'+id);

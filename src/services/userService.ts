import type {User} from "../types/user";
import axios from "axios";

const url="https://dummyjson.com/users"

export const getUser= async ()=>{
    const response =await axios.get(url);
    return response.data.users.map((user:User)=>({
        id:user.id,
        firstName: user.firstName,
        lastName:user.lastName,
        email:user.email
    }));
}

export const addNewUser=async (user: User): Promise<User> =>{
    const response=await axios.post(`${url}/add`,user);
    console.log("PSOT", response);
    return response.data;
}

export const updatedUserApi=async (id:number,user:Omit<User,"id">): Promise<User>=>{
    const response=await axios.put(`${url}/${id}`,user);
    return response.data;
}

export const deleteUserApi=async (id:number)=>{
    const response=await axios.delete(`${url}/${id}`);
    return response.data;
}
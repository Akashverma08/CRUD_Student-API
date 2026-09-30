import type {User} from "../types/user";
import axios from "axios";

const url=import.meta.env.VITE_API_URL
//const url ="https://dummyjson.com/users"



export const getUser= async (
    filterType?:string,
    search?:string
    )=>{
    const response =await axios.get(`${url}/products`,{
        params:{
            [filterType!]:search
        }
    });
    //console.log(response)
    return response.data;
}

export const addNewUser=async (user: User): Promise<User> =>{
    const response=await axios.post(`${url}/products/add`,user);
    console.log("Post", response);
    return response.data;
}

export const updatedUserApi=async (id:number,user:User): Promise<User>=>{
    const response=await axios.patch(`${url}/products/${id}`,user);
    
    return response.data;
}

export const deleteUserApi=async (id:number)=>{
    const response=await axios.delete(`${url}/products/${id}`);
    return response.data;
}

export const getUserbyId=async(id:number)=>{
    const response=await axios.get(`${url}/products/${id}`);
    return response.data;

}
import { Route, Routes } from "react-router";
import "./App.css";
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import EditUser from "./components/EditUser";

import {useState,useEffect} from "react";
import type {User} from "./types/user";
import {getUser}  from "./services/userService";
import UserCard from "./components/UserCard";
import Dashboard from "./pages/Dashboard";
//import StudentDirectory from "./Students/StudentDirectory"
export default function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUsers(res);
      } catch (err) {
        console.log("Something Error");
      }finally{
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const addUsertoList=(user:User)=>{
    setUsers((prev)=>[...prev,user])

  }
  
  const userUpdate=(user:User)=>{
    setUsers((prev)=> prev.map((item)=>(
      item.id===user.id ?user:item
    )))
  }

  const deleteUser=(id:Number)=>{
    setUsers((prev)=>prev.filter((item)=>(
      item.id !== id
    )))
  }



  return (

    <div className="app">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserList users={users} onDeleteUser={deleteUser} loading={loading}/>} />
          <Route path="/add-user" element={<UserForm users={users} onUserAdded={addUsertoList} />} />
          <Route path="/edit/:id" element={<EditUser users={users} userEdited={userUpdate} />} />
          <Route path="/view/:id" element={<UserCard users={users}/>}/>
          <Route path="/dashboard" element={<Dashboard users={users}/>}/>
        </Routes>


      </div>
      <Footer />
    </div>
  )
}
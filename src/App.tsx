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
import {getUser,deleteUserApi}  from "./services/userService";
import UserCard from "./components/UserCard";
import Dashboard from "./pages/Dashboard";
import NotFound from "./components/PageNotFound";

export default function App() {

  const [users, setUsers] = useState<User[]>([]);
  const [loading,setLoading]=useState<boolean>(true);
  const [error,setError]=useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        setUsers(res);
      } catch (err) {
        setError("Something went wrong.Unable to fetch the data from URL")
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

  const deleteUser=async(id:Number)=>{
    try{
      await deleteUserApi(Number(id));

      setUsers((prev)=> prev.filter((user)=> user.id!==id));

    }catch(err){
      setError("Unable to delete")
    }
  }

  const handleFilter=async (filterType:string,search:string)=>{
    try{
      setLoading(true);
      const res=await getUser(filterType,search);
      
      setUsers(res);

    }catch(err){
      setError("Unable to fetch filter data");
    }finally{
      setLoading(false);
    }

  }



  return (

    <div className="app">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <Routes>
          <Route path="/" element={<UserList users={users} onDeleteUser={deleteUser} loading={loading} error={error} 
          onFilter={handleFilter}/>} />
          <Route path="/add-user" element={<UserForm users={users} onUserAdded={addUsertoList} />} />
          <Route path="/edit/:id" element={<EditUser users={users} userEdited={userUpdate} />} />
          <Route path="/view/:id" element={<UserCard />}/>
          <Route path="/dashboard" element={<Dashboard users={users}/>}/>
          <Route  path="/*" element ={<NotFound/>} />
        </Routes>

      </div>
      <Footer />
    </div>
  )
}
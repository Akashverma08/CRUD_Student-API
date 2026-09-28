
import { Link } from "react-router";
import type { User } from "../types/user";
import {deleteUserApi} from "../services/userService";
import Loading from "./Loading";

type UserListProps = {
  users: User[];
  onDeleteUser:(id:Number)=>void;
  loading: boolean;
};

export default function UserList({users,onDeleteUser,loading}:UserListProps) {

    const handleDelete=(id:number)=>{
        //onDeleteUser(Number(id));
        try{
            const deleteUser= async ()=>{
                const res=await deleteUserApi(id);
                console.log(res)
                onDeleteUser(res.id)
            }
            deleteUser();

        }catch(err){
            console.log("Error here")

        }
    }
    return (
        <div className="user-list">
            <h1>User List</h1>
            <hr />
            <Link to="/add-user"><button>Add User</button></Link>

            {loading && <Loading/>}
            
            <table border={1}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((e) => (
                        <tr key={e.id}>
                            <td>{e.id}</td>
                            <td>{`${e.firstName} ${e.lastName}`}</td>
                            <td>{e.email}</td>
                            <td>
                                <Link to={`/edit/${e.id}`}><button>Edit</button></Link>
                                <Link to={`/view/${e.id}`}><button>View</button></Link>
                                
                                <button type="button" onClick={()=> handleDelete(e.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
}
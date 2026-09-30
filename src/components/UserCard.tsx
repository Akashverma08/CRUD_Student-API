import type { User } from "../types/user";
import { useParams } from "react-router";
import { getUserbyId } from "../services/userService";
import { useState,useEffect } from "react";


/*interface viewProps {
  users: User[];
}*/


//export default function UserCard({ users }: viewProps)
export default function UserCard() {
  const { id } = useParams();
  const [fetchSingleUser,setFetchSingleUser]=useState<User | null>(null);
  useEffect(() => {
    const getsingleUser = async () => {
      try {
        const user = await getUserbyId(Number(id));
        setFetchSingleUser(user);

      } catch (err) {
        console.log("Error");

      }

    }
    getsingleUser();
  }, [])
  /*const singleUser = users.find(
    (user) => user.id === Number(id)
  );*/

  return (
    <div className="user-card-container">
      <div className="user-card">
        <h2>User Details</h2>

        <ul>
          <li>
            <strong>ID:</strong> {fetchSingleUser?.id}
          </li>

          <li>
            <strong>Name:</strong>{" "}
            {`${fetchSingleUser?.firstName} ${fetchSingleUser?.lastName}`}
          </li>

          <li>
            <strong>Email:</strong> {fetchSingleUser?.email}
          </li>
        </ul>
      </div>
    </div>
  );
}
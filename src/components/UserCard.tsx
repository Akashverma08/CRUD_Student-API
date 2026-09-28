import type { User } from "../types/user";
import { useParams } from "react-router";


interface viewProps {
  users: User[];
}

export default function UserCard({ users }: viewProps) {
  const { id } = useParams();

  const singleUser = users.find(
    (user) => user.id === Number(id)
  );

  return (
    <div className="user-card-container">
      <div className="user-card">
        <h2>User Details</h2>

        <ul>
          <li>
            <strong>ID:</strong> {singleUser?.id}
          </li>

          <li>
            <strong>Name:</strong>{" "}
            {`${singleUser?.firstName} ${singleUser?.lastName}`}
          </li>

          <li>
            <strong>Email:</strong> {singleUser?.email}
          </li>
        </ul>
      </div>
    </div>
  );
}
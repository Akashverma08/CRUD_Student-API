import type { User } from "../types/user";


interface dashboardProps {
    users: User[];
}
export default function Dashboard({ users }: dashboardProps) {
    const total = users.length;
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <hr />

            <div className="dashboard-card">
                <h2>Total Users</h2>
                <p>{total}</p>
            </div>
        </div>
    );
}
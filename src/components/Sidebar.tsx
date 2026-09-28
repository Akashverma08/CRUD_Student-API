import { Link } from "react-router";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">
        <h3>Dashboard</h3>
      </Link>

      <Link to="/">
        <h3>Students</h3>
      </Link>
    </aside>
  );
}
import { Link } from "react-router";
import type { User } from "../types/user";
import { deleteUserApi } from "../services/userService";
import Loading from "./Loading";
import { useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Button } from "@mui/material";

type UserListProps = {
    users: User[];
    onDeleteUser: (id: number) => void;
    loading: boolean;
    error: string;
};

export default function UserList({users,onDeleteUser,loading,error,}: UserListProps) {

    const [serach, setSearch] = useState("");
    const [filtertype, setFiltertype] = useState("");
    const [appliedfilter, setAppliedfilter] = useState("");

    const handleDelete = async (id: number) => {
        try {
            const res = await deleteUserApi(id);
            console.log(res);

            onDeleteUser(res.id);

        } catch (err) {
            console.log(err);
            alert("Unable to delete the User");
        }
    };

    // Filter users
    const filteredUser = users.filter((user) => {

        if (appliedfilter === "firstName") {
            return user.firstName.toLowerCase().includes(serach.toLowerCase());
        }

        if (appliedfilter === "lastName") {
            return user.lastName.toLowerCase().includes(serach.toLowerCase());
        }

        if (appliedfilter === "email") {
            return user.email.toLowerCase().includes(serach.toLowerCase());
        }

        return true;
    });

    // DataGrid columns
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 80,
        },
        {
            field: "name",
            headerName: "Name",
            width: 200,
        },
        {
            field: "email",
            headerName: "Email",
            width: 250,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,

            renderCell: (params) => (
                <>
                    <Link to={`/edit/${params.row.id}`}>
                        <Button
                            variant="contained"
                            size="small"
                        >
                            Edit
                        </Button>
                    </Link>

                    <Link to={`/view/${params.row.id}`}>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ ml: 1 }}
                        >
                            View
                        </Button>
                    </Link>

                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    // DataGrid rows
    const rows = filteredUser.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
    }));

    return (
        <div className="user-list">

            <h1>User List</h1>
            <hr />

            {/* Search + Filter + Add User */}
            <div className="user-actions">

                <input
                    className="search-input"
                    type="text"
                    placeholder="Enter the word to search"
                    value={serach}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="filter-section">

                    <select value={filtertype} onChange={(e) => setFiltertype(e.target.value)}>
                        <option value="">Select Filter</option>
                        <option value="firstName">FirstName</option>
                        <option value="lastName">LastName</option>
                        <option value="email">Email</option>
                    </select>

                    <button type="button" onClick={() => {setAppliedfilter(filtertype);}}>Apply Filter</button>

                </div>

                <Link to="/add-user">
                    <button className="add-user-btn">Add User</button>
                </Link>

            </div>

            {/* Loading */}
            {loading && <Loading />}

            {/* Error */}
            {error && (
                <p className="form-error">
                    {error}
                </p>
            )}

            {/* DataGrid */}
            <div style={{ width: "100%", marginTop: "20px" }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[ 10, 20,30]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                                page: 0,
                            },
                        },
                    }}
                    autoHeight
                />

            </div>

        </div>
    );
}
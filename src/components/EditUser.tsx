import { useParams, useNavigate } from "react-router";
import type { User } from "../types/user";
import { useState } from "react";
import React from "react";
import { updatedUserApi } from "../services/userService";

export type UserEditProps = {
    users: User[];
    userEdited: (user: User) => void;
}
export default function EditUser({ users, userEdited }: UserEditProps) {

    const { id } = useParams();
    const singleUser = users.find((user) => user.id === Number(id));
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(singleUser?.firstName || "");
    const [lastName, setLastName] = useState(singleUser?.lastName || "");
    const [email, setEmail] = useState(singleUser?.email || "");

    const handleSubmit = (async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const updateUser = {
            firstName,
            lastName,
            email,
        }

        try {
            const result = await updatedUserApi(Number(id), updateUser);
            const updatedUser: User = {
                id: Number(id),
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email
            };

            userEdited(updatedUser);
            navigate("/");


        } catch (err) {
            console.log(err);
        }
    })

    return (
        <div className="user-form-page">
            <h1>Edit User</h1>
            <hr />

            <form className="user-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter the first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Enter the last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter the email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
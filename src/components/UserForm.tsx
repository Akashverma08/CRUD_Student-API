import { useState } from "react";
import React from "react";
import type { User } from "../types/user";
import { addNewUser } from "../services/userService";
import { useNavigate } from "react-router";

type UserFormProps = {
    users: User[];
    onUserAdded: (user: User) => void;
}

export default function UserForm({ users, onUserAdded }: UserFormProps) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
        const newUser = {
            id: newId,
            firstName,
            lastName,
            email,
        }

        try {
            const res = await addNewUser(newUser);
            const adduser = {
                id: newId,
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email
            }
            onUserAdded(adduser);
            navigate("/");
        } catch (err) {
            console.log("Error")
        }



    })
    return (
        <div className="user-form-page">
            <h1>Add User</h1>
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
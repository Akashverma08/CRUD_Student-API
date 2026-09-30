import { Formik, Form, Field, ErrorMessage } from "formik";
import type { User } from "../types/user";
import { addNewUser } from "../services/userService";
import { useNavigate } from "react-router";
import { userValidationSchema } from "../validation/userValidation";
import {useState} from "react";
type UserFormProps = {
  users: User[];
  onUserAdded: (user: User) => void;
};

export default function UserForm({
  users,
  onUserAdded,
}: UserFormProps) {
  const [loading,setLoading]=useState(true);

  const navigate = useNavigate();

  return (
    <div className="user-form-page">

      <h1>Add User</h1>
      <hr />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}

        validationSchema={userValidationSchema}

        onSubmit={async (values) => {

          const newId =
            users.length > 0
              ? Math.max(...users.map(user => user.id)) + 1
              : 1;

          const newUser = {
            id: newId,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          };

          try {
            const res = await addNewUser(newUser);
            onUserAdded(res);
            navigate("/");

          } catch (err) {
            console.log(err);
          }finally{
            setLoading(false);
          }
        }}
      >

        <Form className="user-form">

          <Field
            type="text"
            name="firstName"
            placeholder="Enter the first name"
          />
          <ErrorMessage name="firstName" />

          <Field
            type="text"
            name="lastName"
            placeholder="Enter the last name"
          />
          <ErrorMessage name="lastName" />

          <Field
            type="email"
            name="email"
            placeholder="Enter the email"
          />
          <ErrorMessage name="email" />

          <button type="submit">
            Submit
          </button>

        </Form>

      </Formik>

    </div>
  );
}
import { useParams, useNavigate } from "react-router";
import type { User } from "../types/user";
import { updatedUserApi } from "../services/userService";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidationSchema } from "../validation/userValidation";

export type UserEditProps = {
  users: User[];
  userEdited: (user: User) => void;
};

export default function EditUser({
  users,
  userEdited,
}: UserEditProps) {

  const { id } = useParams();
  const navigate = useNavigate();

  const singleUser = users.find(
    (user) => user.id === Number(id)
  );

  return (
    <div className="user-form-page">

      <h1>Edit User</h1>
      <hr />

      <Formik
        initialValues={{
          firstName: singleUser?.firstName || "",
          lastName: singleUser?.lastName || "",
          email: singleUser?.email || "",
        }}

        validationSchema={userValidationSchema}

        onSubmit={async (values, { setStatus }) => {

          const updateUser = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          };

          try {

            const result = await updatedUserApi(
              Number(id),
              updateUser
            );

            const updatedUser: User = {
              id: Number(id),
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
            };

            userEdited(updatedUser);

            navigate("/");

          } catch (err) {

            console.log(err);
            setStatus("Something went wrong, unable to edit.");

          }
        }}
      >

        {({ status }) => (
          <Form className="user-form">

            {status && (
              <p className="form-error">
                {status}
              </p>
            )}

            <Field
              type="text"
              name="firstName"
              placeholder="Enter the first name"
            />

            <ErrorMessage
              name="firstName"
              component="p"
              className="form-error"
            />

            <Field
              type="text"
              name="lastName"
              placeholder="Enter the last name"
            />

            <ErrorMessage
              name="lastName"
              component="p"
              className="form-error"
            />

            <Field
              type="email"
              name="email"
              placeholder="Enter the email"
            />

            <ErrorMessage
              name="email"
              component="p"
              className="form-error"
            />

            <button type="submit">
              Update
            </button>

          </Form>
        )}

      </Formik>

    </div>
  );
}
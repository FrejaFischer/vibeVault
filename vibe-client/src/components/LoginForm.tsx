import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";
import InputGroup from "./InputGroup";
import Button from "./Button";

const LoginForm = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.login(email, password);
      navigate("/entries"); // Redirect after successful login
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;

      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.error;

        if (status === 400) {
          setError(serverMessage ?? "Validation error");
        } else if (status === 401) {
          setError("Invalid credentials");
        } else if (status === 403 || status === 500) {
          setError("Server error - Please contact us");
          console.error(serverMessage ?? "Server error");
        }
      } else {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 my-2 border-2 bg-white md:px-6 border-black rounded-2xl items-center justify-center gap-6">
      <h2 className="uppercase font-black self-center my-2">Login</h2>
      <InputGroup inputType="email" id="txtEmail" inputName="email" labelText="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputGroup inputType="password" id="pwPassword" inputName="password" labelText="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" text="LOGIN" />
      <p>
        Or do you want to
        <Link to="/signup" className="underline ml-2">
          Signup?
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

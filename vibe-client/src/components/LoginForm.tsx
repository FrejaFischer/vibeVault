import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import InputGroup from "./InputGroup";
import { AxiosError } from "axios";

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
    <form onSubmit={handleSubmit}>
      <InputGroup inputType="email" id="txtEmail" inputName="email" labelText="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputGroup inputType="password" id="pwPassword" inputName="password" labelText="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

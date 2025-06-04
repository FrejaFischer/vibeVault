import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import InputGroup from "./InputGroup";

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
      setError("Invalid username or password");
      console.log(err);
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

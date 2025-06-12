import { NavLink } from "react-router";

const AuthNav = () => {
  return (
    <>
      <li>
        <NavLink to="/">Login</NavLink>
      </li>
      <li>
        <NavLink to="/signup">Signup</NavLink>
      </li>
    </>
  );
};

export default AuthNav;

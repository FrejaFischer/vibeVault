import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const UserNav = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logout");
    try {
      await auth?.logout();
      navigate("/"); // Redirect after successful logout
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <li>
        <NavLink to="entries">Entries</NavLink>
      </li>
      <li>
        <NavLink to="profile">Profile</NavLink>
      </li>
      <li>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  );
};

export default UserNav;

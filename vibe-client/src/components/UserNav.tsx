import { NavLink } from "react-router";

const UserNav = () => {
  return (
    <>
      <li>
        <NavLink to="entries">Entries</NavLink>
      </li>
      <li>
        <NavLink to="profile">Profile</NavLink>
      </li>
      <li>Logout</li>
    </>
  );
};

export default UserNav;

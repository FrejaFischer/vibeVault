import { Outlet } from "react-router";
import UserNav from "../components/UserNav";
import Header from "../components/Header";

const UserLayout = () => {
  return (
    <>
      <Header>
        <UserNav />
      </Header>
      <Outlet />
    </>
  );
};

export default UserLayout;

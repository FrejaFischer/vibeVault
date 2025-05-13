import { Outlet } from "react-router";
import AuthNav from "../components/AuthNav";
import Header from "../components/Header";

const AuthLayout = () => {
  return (
    <>
      <Header>
        <AuthNav />
      </Header>
      <Outlet />
    </>
  );
};

export default AuthLayout;

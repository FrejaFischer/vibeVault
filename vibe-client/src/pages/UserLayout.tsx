import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import UserNav from "../components/UserNav";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const UserLayout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is logged in (has valid token in cookie) - if not redirect to landingpage
  useEffect(() => {
    if (!auth?.loading && !auth?.isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  // While checking the authentication, show this:
  if (auth?.loading) {
    return <p>Loading...</p>;
  }

  // Fallback while redirecting (so the page is not viewed before redirecting works)
  if (!auth?.isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header>
        <UserNav />
      </Header>
      <main className="px-2 mx-auto max-w-[1156px] w-full">
      <Outlet />
      </main>
    </>
  );
};

export default UserLayout;

import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import AuthNav from "../components/AuthNav";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";

const AuthLayout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if user is logged in (has valid token in cookie) - if true redirect to entries page
  useEffect(() => {
    if (!auth?.loading && auth?.isAuthenticated) {
      navigate("/entries", { replace: true });
    }
  }, [auth, navigate]);

  // While checking the authentication, show this:
  if (auth?.loading) {
    return <p>Loading...</p>;
  }

  // Fallback while redirecting (so the page is not viewed before redirecting works)
  if (auth?.isAuthenticated) {
    return null;
  }

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

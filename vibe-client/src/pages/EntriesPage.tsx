import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EntriesPage = () => {
  const auth = useContext(AuthContext);

  if (!auth?.isAuthenticated) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome</p>
    </div>
  );
};

export default EntriesPage;

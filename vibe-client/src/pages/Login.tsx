import IconButton from "../components/IconButton";

const Login = () => {
  return (
    <>
      <title>vibeVault - Login</title>
      <div>Login</div>
      <IconButton icon="loop" text="Search" onClick={() => console.log("search")} />
      <IconButton icon="create" text="Create new entry" onClick={() => console.log("create")} />
      <IconButton icon="sort" text="Sort" onClick={() => console.log("sort")} />
    </>
  );
};

export default Login;

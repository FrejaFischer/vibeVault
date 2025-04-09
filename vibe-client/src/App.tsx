import Nav from "./components/Nav";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </>
  );
}

export default App;

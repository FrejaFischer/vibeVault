import LandingPage from "./pages/LandingPage";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import SignupPage from "./pages/SignupPage";
import EntriesPage from "./pages/EntriesPage";
import { createBrowserRouter } from "react-router";
import ProfilePage from "./pages/ProfilePage";
import EntryPage from "./pages/EntryPage";
import AuthLayout from "./pages/AuthLayout";
import UserLayout from "./pages/UserLayout";
import TestPage from "./pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        Component: AuthLayout,
        children: [
          {
            path: "/",
            index: true,
            Component: LandingPage,
          },
          {
            path: "/signup",
            Component: SignupPage,
          },
        ],
      },
      {
        Component: UserLayout,
        children: [
          {
            path: "/entries",
            index: true,
            Component: EntriesPage,
          },
          {
            path: "/entries/:id",
            Component: EntryPage,
          },
          {
            path: "/profile",
            Component: ProfilePage,
          },
          {
            path: "/test",
            Component: TestPage,
          },
        ],
      },
    ],
  },
]);

// der skal laves logi om hvilken menu man har adgang til afhængigt af om man er logget ind eller ej
// docs: https://reactrouter.com/start/data/routing
export default router;

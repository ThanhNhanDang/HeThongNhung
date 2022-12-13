import { useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/aboutUs/AboutUs";
import Charts from "./pages/charts/Charts";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Setting from "./pages/Setting/Setting";

// ----------------------------------------------------------------------
export default function Router({ mobile }) {
  const [userAuth] = useState({
    name: "yesthanhnhan16@gmail.com",
    pass: "Đặng",
  });

  // JSON.parse(localStorage.getItem("user"));
  return useRoutes([
    {
      path: "/dashboard",
      element:
        userAuth === null || userAuth === undefined ? (
          <Login />
        ) : (
            <Navbar />
          //   <Connector options={options} parserMethod={(msg) => msg}>
          //   </Connector>
        ),
      children: [
        {
          path: "app",
          element:
            userAuth === null || userAuth === undefined ? (
              <Login />
            ) : (
              <Dashboard mobile={mobile} />
            ),
        },
        {
          path: "charts",
          element:
            userAuth === null || userAuth === undefined ? (
              <Login />
            ) : (
              <Charts mobile={mobile} />
            ),
        },
        {
          path: "setting",
          element:
            userAuth === null || userAuth === undefined ? (
              <Login />
            ) : (
              <Setting />
            ),
        },
        {
          path: "aboutus",
          element:
            userAuth === null || userAuth === undefined ? (
              <Login />
            ) : (
              <AboutUs />
            ),
        },
      ],
    },
    {
      path: "/",
      children: [
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        {
          path: "login",
          element: <Login />,
        },

        { path: "404", element: <PageNotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

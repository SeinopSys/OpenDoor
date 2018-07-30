import Overview from "../pages/overview";
import Login from "../pages/login";
import Register from "../pages/register";
import NoMatch from "../pages/noMatch";

const routes = [
  {
    path: "/",
    exact: true,
    auth: true,
    component: Overview
  },
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login
  },
  {
    path: "/register",
    exact: true,
    auth: false,
    component: Register
  },
  {
    path: "",
    exact: true,
    auth: false,
    component: NoMatch
  }
];

export default routes;

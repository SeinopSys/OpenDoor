import Overview from "../pages/overview";
import Login from "../pages/login";
import Signup from "../pages/signup";
import NoMatch from "../pages/noMatch";
import StashesForm from "../pages/stashes/form";

const routes = [
  // Public
  {
    path: "/login",
    exact: true,
    auth: false,
    component: Login
  },
  {
    path: "/signup",
    exact: true,
    auth: false,
    component: Signup
  },
  // Private
  {
    path: "/",
    exact: true,
    auth: true,
    component: Overview
  },
  {
    path: "/stashes/new",
    exact: true,
    auth: true,
    component: StashesForm
  },
  {
    path: "/stashes/edit/:id",
    exact: true,
    auth: true,
    component: StashesForm
  },
  // 404
  {
    path: "",
    exact: true,
    auth: false,
    component: NoMatch
  },
];

export default routes;

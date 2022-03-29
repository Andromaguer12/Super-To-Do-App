import { lazy } from "react";
import { Allroutes } from "../allroutes";

export const publicRoutes = [
  {
    path: Allroutes.login,
    component: lazy(() => import("../../LoginPage")),
    redirect: false,
    to: Allroutes.todos,
  },
];

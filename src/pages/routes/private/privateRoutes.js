import { lazy } from "react";
import { Allroutes } from "../allroutes";

export const privateRoutes = [
  {
    path: Allroutes.todos,
    component: lazy(() => import("../../TodosPage")),
    redirect: true,
    to: Allroutes.login,
  },
  {
    path: Allroutes.favorites,
    component: lazy(() => import("../../FavoritesPage")),
    redirect: true,
    to: Allroutes.login,
  },
];

import { privateRoutes } from "./private/privateRoutes";
import { publicRoutes } from "./public/publicRoutes";

export const RoutesTemplate = [
  {
    routes: privateRoutes,
    auth: "user",
  },
  {
    routes: publicRoutes,
    auth: "null",
  },
];

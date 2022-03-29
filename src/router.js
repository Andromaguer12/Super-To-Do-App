import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { RoutesTemplate } from "./pages/routes/routesTemplate";
import RoutesValidator from "./pages/routes/RoutesValidator";

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="page-loaders flex-c-ac-jc">
            <CircularProgress color="secondary" />
          </div>
        }
      >
        <Switch>
          {RoutesTemplate.map(({ routes, auth }) => {
            return routes.map((route) => (
              <Route
                path={route.path}
                key={route.path}
                exact={true}
                render={(routedata) => {
                  return (
                    <RoutesValidator
                      route={routedata}
                      path={route.path}
                      auth={auth}
                      component={route.component}
                      redirect={route.to}
                    />
                  );
                }}
              />
            ));
          })}
          <Route path="/" component={ErrorPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

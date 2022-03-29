import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser } from "../../storage/UserSlice";
import commonLayout from "./commonLayout";

export default function RoutesValidator({
  route,
  path,
  auth,
  component,
  redirect,
  ...props
}) {
  const User = useSelector(getUser);
  const Layout = commonLayout;
  // user
  const userRestrictions = (user, pageAuth) =>
    user === "user" && pageAuth === "user";
  const nullRestrictions = (user, pageAuth) =>
    user === "null" && pageAuth === "null";

  if (userRestrictions(User.auth, auth)) {
    return <Layout Component={component} {...props} />;
  }

  if (nullRestrictions(User.auth, auth)) {
    return <Layout Component={component} {...props} />;
  }

  return <Redirect to={redirect} />;
}

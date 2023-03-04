import React from "react";
import SideMenuLayout from "../layouts/SideMenuLayout";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";

//Main Layout
const MainLayoutRoute = ({ component: Component, Layout, ...rest }) => (
  <MainLayout>
    <Component {...rest} />
  </MainLayout>
);

//Private Menu Layout
const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <PrivateRoute {...rest} component={Component} layout={SideMenuLayout} />
  );
};

export { MainLayoutRoute, ProtectedRoute };

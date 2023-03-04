import React, { Fragment } from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import RoutePaths from "./RoutePaths";

const PrivateRoute = ({ component: Component, layout, ...rest }) => {
  const { authUser } = useSelector((state) => state.auth);
  const Layout = layout ? layout : Fragment;

  return authUser?.logged ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : (
    <Navigate to={RoutePaths.root} />
  );
};

export default PrivateRoute;

import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Orders from "../pages/Orders";
import NewOrder from "../pages/NewOrder";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";
import SalesOrderHead from "../pages/SalesOrderHead";
import SalesOrder from "../pages/SalesOrder";
import PaymentSuccessPage1 from "../components/Stripe/PaymentSuccessPage1";
import { MainLayoutRoute, ProtectedRoute } from "./RoutingList";
import RoutePaths from "./RoutePaths";

const PageRouters = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path={RoutePaths.root}
          key={1}
          element={<MainLayoutRoute component={Home} />}
        />
        <Route
          path={RoutePaths.singIn}
          key={2}
          element={<MainLayoutRoute component={SignIn} />}
        />
        <Route
          path={RoutePaths.signUp}
          key={3}
          element={<MainLayoutRoute component={SignUp} />}
        />
        <Route
          path={RoutePaths.profile}
          key={4}
          element={<ProtectedRoute component={Profile} />}
        />

        <Route
          path={RoutePaths.order}
          key={5}
          element={<ProtectedRoute component={Orders} />}
        />


        <Route
          path={RoutePaths.newOrder}
          key={6}
          element={<ProtectedRoute component={NewOrder} />}
        />
        <Route
          key={7}
          path={RoutePaths.salesOrders}
          element={<ProtectedRoute component={SalesOrderHead} />}
        />
           <Route
          path={RoutePaths.paymentSuccess}
          key={8}
          element={<ProtectedRoute component={PaymentSuccessPage1} />}
        />

                <Route
          key={13}
          path={RoutePaths.salesOrder}
          element={<ProtectedRoute component={SalesOrder} />}
        />
        <Route
          key={"*"}
          path="*"
          element={<MainLayoutRoute component={PageNotFound} />}
        />
      </Routes>
    </Router>
  );
};

export default PageRouters;

import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../routes/RoutePaths";
const PageNotFound = () => {
  const push = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => push(RoutePaths.root)} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
export default PageNotFound;

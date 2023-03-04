import { Button, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/reducers/auth";
import { userSingIn } from "../../services/auth";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constants";
import jwt_decode from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import RoutePaths from "../../routes/RoutePaths";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const push = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: null,
    password: null,
  });
  const [show, setShow] = useState(false);

  const signInHandler = async () => {
    try {
      const res = await userSingIn({ ...userDetails });
      if (res) {
        const decode = jwt_decode(res);
        dispatch(
          setAuthUser({
            email: decode?.email,
            userName: decode?.email,
            role: decode?.role,
            logged: true,
            token: res,
            tokenExpireTime: decode?.exp,
            userId: Number(decode?.nameid),
            unique_name: decode?.name,
          })
        );
        push(RoutePaths.order);
        dispatch(
          setMenuItem({
            menuKey: "4",
            url: RoutePaths.order,
          })
        );
        message.success("Successfully logged...");
      }
    } catch {
      message.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  return (
    <div style={{ height: 300 }} className="mt-100">
      <form className="sign-in">
        <h3>Login</h3>
        <hr></hr>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter username"
            value={userDetails?.username}
            onChange={(e) =>
              setUserDetails({ ...userDetails, username: e.target.value })
            }
          />
        </div>
        <div className="mb-3 input-wrapper">
          <label>
            Password{" "}
            {show ? (
              <FiEye onClick={() => setShow(!show)} />
            ) : (
              <FiEyeOff onClick={() => setShow(!show)} />
            )}
          </label>
          <input
            type={show ? "text" : "password"}
            className="form-control"
            placeholder="Enter password"
            value={userDetails?.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>
        <div className="d-grid input-wrapper">
          <Button
            type="primary"
            className="btn-primary"
            onClick={signInHandler}
          >
            Login
          </Button>
        </div>

        <p className="text-left">
          New User <a href="/sign-up">Register</a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;

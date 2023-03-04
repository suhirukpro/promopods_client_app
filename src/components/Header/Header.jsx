import React from "react";

import { Button, Layout, Menu, Typography, Popover } from "antd";
import { FiPhoneCall, FiUser, FiLogOut, FiLogIn, FiList } from "react-icons/fi";
import { MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import RoutePaths from "../../routes/RoutePaths";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setAuthUser } from "../../redux/reducers/auth";
import { setMenuItem } from "../../redux/reducers/sideMenu";
import "./Header.css";

const { Header } = Layout;

const MainHeader = () => {
  const { authUser } = useSelector((state) => state.auth);
  const push = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const content = (
    <div>
      <div className="ms-4">
        <span className="ms-2 "> {authUser?.role}&nbsp;&nbsp;</span>
      </div>
      <div className="ms-4">
        <FiPhoneCall />
        <span className="ms-2"> {"+9475 553 321 2"}</span>
      </div>
    </div>
  );

  return (
    <>
      <Header style={{ background: "#fff", padding: 0 }}>
        <>
          {authUser?.logged ? (
            <Menu
              theme="light"
              mode="horizontal"
              style={{
                lineHeight: "64px",
                justifyContent: "end",
                marginLeft: 20,
                marginInlineEnd: 20,
                alignItems: "center",                
              }}
            >
              <span className="ms-2">
                <Popover
                  content={
                    <div>
                      <div className="row ms-1 fw-900">
                        {authUser?.unique_name?.toUpperCase()}
                      </div>
                      <hr style={{ margin: 0 }} />
                      <div className="row mt-1">
                        <div className="d-flex" style={{ cursor: "pointer" }}>
                          <Button
                            onClick={() => {
                              push(RoutePaths.product);
                              dispatch(
                                setMenuItem({
                                  menuKey: "1",
                                  url: RoutePaths.product,
                                  openKeys: ["1"],
                                })
                              );
                            }}
                            block={true}
                          >
                            <FiList style={{ marginTop: 0, marginLeft: -37 }} />
                            <span className="ms-3"> {"Menu"}</span>
                          </Button>
                        </div>
                      </div>
                      {!authUser?.logged ? (
                        <div className="row mt-1">
                          <div
                            className="d-flex "
                            style={{ cursor: "pointer" }}
                          >
                            <Button
                              onClick={() => push(RoutePaths.singIn)}
                              block={true}
                            >
                              <FiLogIn
                                style={{ marginTop: 5, marginLeft: -31 }}
                              />
                              <span className="ms-3"> {"Sign In"}</span>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      {authUser?.logged ? (
                        <div className="row mt-1">
                          <div className="d-flex" style={{ cursor: "pointer" }}>
                            <Button
                              onClick={() => {
                                push(RoutePaths.root);
                                dispatch(setAuthUser(null));
                              }}
                              block={true}
                            >
                              <FiLogOut
                                style={{ marginTop: 5, marginLeft: -13 }}
                              />
                              <span className="ms-2"> {"Sign Out"}</span>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="row mt-1">
                        <div className="d-flex" style={{ cursor: "pointer" }}>
                          <Button
                            onClick={() => {
                              push(RoutePaths.myAccount);
                            }}
                            block={true}
                          >
                            <FiLogOut
                              style={{ marginTop: 5, marginLeft: -13 }}
                            />
                            <span className="ms-2"> {"Profile"}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                  title="User Details"
                  trigger="click"
                  open={open}
                  onOpenChange={() => setOpen(!open)}
                >
                  <FiUser color="#1890ff" />
                  <span className="ms-2">
                    <Typography.Link className="text-bold">
                      {authUser?.unique_name}&nbsp;
                    </Typography.Link>
                  </span>
                </Popover>
              </span>
              <span className="ms-4 desk-block">
                <span className="ms-2 "> {authUser?.role}&nbsp;&nbsp;</span>
              </span>
              <span className="ms-4 desk-block">
                <FiPhoneCall />
                <span className="ms-2"> {"+9475 553 321 2"}</span>
              </span>
              <span className="ms-4">
                <Popover
                  className="m-none"
                  content={content}
                  title=""
                  trigger="click"
                >
                  <Button>
                    <MenuOutlined />
                  </Button>
                </Popover>
              </span>
            </Menu>
          ) : (
            <Menu
              theme="light"
              mode="horizontal"
              style={{
                lineHeight: "64px",
                justifyContent: "end",
                marginLeft: 20,
                marginInlineEnd: 20,
              }}
            >
              <span className="ms-2">
                <Button onClick={() => push(RoutePaths.singIn)}>Sign In</Button>
              </span>
              <span className="ms-2">
                <Button onClick={() => push(RoutePaths.signUp)}>Sign Up</Button>
              </span>
            </Menu>
          )}
        </>
      </Header>
    </>
  );
};

export default MainHeader;

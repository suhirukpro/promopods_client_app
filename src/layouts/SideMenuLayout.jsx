import {
  UserOutlined,
  TeamOutlined,
  GroupOutlined,
  ShoppingOutlined,
  PoundOutlined,
  ProfileOutlined,
  CarOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import MenuLogo from "../assets/menu-logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setMenuItem } from "../redux/reducers/sideMenu";
import "./Layout.css";
import RoutePaths from "../routes/RoutePaths";

const { Content, Sider } = Layout;

const getItem = (label, key, icon, children) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

const menuList = [
  getItem("Profile", "1"),
  getItem("Orders", "2")];

//Mapping Url Paths
const urlPaths = {
  1: "/profile",
  2: "/order"
};

const SideMenuLayout = ({ children }) => {
  const { menuItem } = useSelector((state) => state.sideMenu);
  const push = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  const menuHandler = (val) => {
    push(urlPaths[Number(val.key)]);
    dispatch(
      setMenuItem({
        menuKey: val.key,
        url: urlPaths[Number(val.key)],
        openKeys: val.keyPath,
      })
    );
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >


      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        collapsed={collapsed}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}
      >
        <div
          className="text-center logo-image"
          onClick={() => push(RoutePaths.root)}
        >
          <img src={MenuLogo} alt={"logo"} style={{ height: 90 }} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menuList}
          onClick={menuHandler}
          defaultOpenKeys={menuItem.openKeys ? menuItem.openKeys : []}
        />
      </Sider>

      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default SideMenuLayout;

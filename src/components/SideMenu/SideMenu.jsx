//import useState hook to create menu collapse state
import React, { useEffect, useState } from "react";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaSwimmer, FaRunning, FaLayerGroup } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
  FiLogIn,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiPackage,
} from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FcSalesPerformance } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";

import { useNavigate } from "react-router-dom";
import SwimLogo from "../../assets/side_bar_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/auth";
import { setActiveItem } from "../../redux/reducers/sideMenu";

import useRoleCheck from "../../hooks/useRoleCheck";
import { UserRolesPermission } from "../../utils/constants";
import RoutePaths from "../../routes/RoutePaths";
import "./SideMenu.css";

const menus = [
  {
    itemName: "Home",
    icon: <FiHome />,
    key: 1,
    url: "/",
    auth: false,
    admin: true,
    staff: true,
  },
  {
    itemName: "Product",
    icon: <FiPackage />,
    key: 2,
    url: "/product",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Customer",
    icon: <FiUsers />,
    key: 3,
    url: "/customer",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Customer Contact",
    icon: <FiUsers />,
    key: 4,
    url: "/customer-contact",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Customer Delivery",
    icon: <FiUsers />,
    key: 5,
    url: "/customer-delivery",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Supplier",
    icon: <FiUsers />,
    key: 6,
    url: "/supplier",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Supplier Contact",
    icon: <FiUsers />,
    key: 7,
    url: "/supplier-contact",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Cohort",
    icon: <FaLayerGroup />,
    key: 8,
    url: "/cohort",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Cohort Delivery",
    icon: <FaLayerGroup />,
    key: 9,
    url: "/cohort-delivery",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Sales Order",
    icon: <FcSalesPerformance />,
    key: 10,
    url: "/sales-order-head",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Sales Order Items",
    icon: <FcSalesPerformance />,
    key: 11,
    url: "/sales-order-line",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Purchase Order",
    icon: <FiUser />,
    key: 12,
    url: "/purchase-order",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Delivery",
    icon: <TbTruckDelivery />,
    key: 13,
    url: "/delivery-note",
    auth: true,
    admin: true,
    staff: true,
  },
  {
    itemName: "Sign In",
    icon: <FiLogIn />,
    key: 14,
    url: "/sign-in",
    auth: false,
    admin: false,
    staff: false,
  },
  {
    itemName: "Sign Up",
    icon: <FiUserCheck />,
    key: 15,
    url: "/sign-up",
    auth: false,
    admin: false,
    staff: false,
  },
];

const SideMenu = ({ menuCollapse, setMenuCollapse }) => {
  const [menuItems, setMenuItems] = useState([...menus]);
  const { activeItem } = useSelector((state) => state.sideMenu);
  const { authUser } = useSelector((state) => state.auth);
  const adminRole = useRoleCheck(UserRolesPermission.Admin);
  const staffRole = useRoleCheck(UserRolesPermission.Staff);

  const dispatch = useDispatch();
  const push = useNavigate();

  //create initial menuCollapse state using useState hook

  //create a custom function that will change menucollapse state from true to true and true to true
  const menuIconClick = () => {
    //condition checking to change state from true to true and vice versa
    menuCollapse ? setMenuCollapse(true) : setMenuCollapse(true);
  };

  useEffect(() => {
    const activeKey = menuItems.find((x) =>
      x.url.includes(window.location.pathname)
    )?.key;
    dispatch(setActiveItem(activeKey));
  }, []);

  useEffect(() => {
    if (authUser?.logged) {
      const filterData = [
        ...menus?.filter(
          (x) =>
            !(
              x?.url?.includes(RoutePaths.singIn) ||
              x?.url?.includes(RoutePaths.signUp)
            )
        ),
      ];
      if (adminRole)
        return setMenuItems([...filterData?.filter((x) => x?.admin)]);
      if (staffRole)
        return setMenuItems([...filterData?.filter((x) => x?.staff)]);
    } else {
      setMenuItems([...menus?.filter((x) => !x?.auth)]);
    }
  }, [adminRole, authUser, staffRole]);

  return (
    <>
      <div id="header">
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {!menuCollapse ? (
                <div
                  className="text-center"
                >
                  <img src={SwimLogo} alt={"logo"} style={{ height: 86 }} />
                </div>
              ) : (
                <Menu iconShape="round" popperArrow={true}>
                  <MenuItem icon={<FaSwimmer />} style={{ height: 56 }} />
                </Menu>
              )}
            </div>
            <div className="closemenu cursor-pointer" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle style={{ color: "#A7C7E7" }} />
              ) : (
                <FiArrowLeftCircle style={{ color: "#A7C7E7" }} />
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              {menuItems.map((item, i) => {
                return (
                  <MenuItem
                    key={i}
                    active={activeItem === item.key}
                    icon={item.icon}
                    onClick={() => {
                      dispatch(setActiveItem(item.key));
                      push(item.url);
                    }}
                  >
                    {item.itemName}
                  </MenuItem>
                );
              })}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                onClick={() => {
                  dispatch(logOut(null));
                  dispatch(setActiveItem(1));
                  push("/");
                }}
                icon={<FiLogOut />}
              >
                Sign Out
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default SideMenu;

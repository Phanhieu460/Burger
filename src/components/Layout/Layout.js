import React, { useState } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerState, setSideDraweState] = useState(false);
  const sideDrawerClosedHandler = () => {
    setSideDraweState(false);
  };
  const sideDrawerToggleHandler = () => {
    setSideDraweState(!sideDrawerState);
  };
  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer open={sideDrawerState} closed={sideDrawerClosedHandler} />
      <main className="Content">{props.children}</main>
    </Aux>
  );
};
export default Layout;

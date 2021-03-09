import React, { useState } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => {
  const [sideDrawerState, setSideDraweState] = useState({
    showSideDrawer: true,
  });
  const sideDrawerClosedHandler = () => {
    setSideDraweState({
      showSideDrawer: false,
    });
  };
  const sideDrawerToggleHandler = () => {
    setSideDraweState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };
  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      {/* <SideDrawer
        open={sideDrawerState.showSideDrawer}
        closed={sideDrawerClosedHandler}
      /> */}
      <main className="Content">{props.children}</main>
    </Aux>
  );
};
export default Layout;

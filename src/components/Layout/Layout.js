import React, { useState } from "react";
import Aux from "../../hoc/Auxx/Auxx";
import "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { useSelector } from "react-redux";

const Layout = (props) => {
  const [sideDrawerState, setSideDraweState] = useState(false);
  const sideDrawerClosedHandler = () => {
    setSideDraweState(false);
  };
  const sideDrawerToggleHandler = () => {
    setSideDraweState(!sideDrawerState);
  };

  const isAuthenticate = useSelector((state) => state.auth.token !== null);
  return (
    <Aux>
      <Toolbar
        isAuth={isAuthenticate}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticate}
        open={sideDrawerState}
        closed={sideDrawerClosedHandler}
      />
      <main className="Content">{props.children}</main>
    </Aux>
  );
};
export default Layout;

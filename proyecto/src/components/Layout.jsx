import { useState } from "react";
import PropTypes from "prop-types";
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import "../styles/Layout.css";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout">
      <NavBar />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`main-container ${collapsed ? "collapsed" : ""}`}>
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

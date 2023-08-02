import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Fragment>
      <header>
        <div className="container header-link">
          <Link to="/categories">Home</Link>
          <h1>Actor && Movie</h1>
          <Link to="/categories">Movie</Link>
        </div>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default Layout;

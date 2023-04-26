import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem('user');
  return (
    <div>
      <ul className="nav-ul">
        <li>
          {" "}
          <Link to="/">Product</Link>
        </li>
        <li>
          {" "}
          <Link to="/add">Add Product</Link>
        </li>
        <li>
          {" "}
          <Link to="/update">update Product</Link>
        </li>
        <li>
          {" "}
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          {" "}
          
        </li>
        <li>
          {" "}
          { auth ?<Link to="/logout">Log Out</Link>:
          <Link to="/signup">Sign Up</Link>}
        </li>
      </ul>
    </div>
  );
};
export default Nav;

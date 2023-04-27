import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate =useNavigate();
const logout= () => {
  console.warn ("apple");
  localStorage.clear();
  navigate('./signup')
}

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
          { auth ?<Link onClick={logout} to="/logout">Log Out</Link>:
          <Link to="/signup">Sign Up</Link>}
        </li>
      </ul>
    </div>
  );
};
export default Nav;

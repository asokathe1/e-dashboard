import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    console.warn("apple");
    console.log(localStorage.getItem("user"));
    localStorage.clear();
    navigate("./signup");
  };

  return (
    <div>
      {auth ? (
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
            <Link onClick={logout} to="/logout">
              Log Out 
             ({JSON.parse(auth).name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Nav;

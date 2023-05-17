import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Signup from "./components/Signup";
import Login from './components/Login'
import AddProduct from "./components/AddProduct";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateComponent from "./components/PrivateComponent";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <h1>E-Dashboard</h1>
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/profile" element={<h1>Profile</h1>} />
          <Route path="/logout" element={<h1>Log out</h1>} />
          </Route> 
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;


import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(params);
    getProductDetails();
  }, []);
  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:5000/products/${params.id}`,{
      method: "Get",
      headers:{
        authorization:`${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setBrand(result.brand);
  };

  const updateProduct = async () => {
    console.log(name, price, category, brand);
    let headers = new Headers();
    headers.set("Content-type", "application/json")
    headers.set("authorization", `${JSON.parse(localStorage.getItem('token'))}`)
    console.log(headers);
    let result = await fetch(`http://localhost:5000/products/${params.id}`, {
      method: "Put",
      body: JSON.stringify({ name, price, category, brand }),
      headers: headers,
    });

    result = result.json(result);
    console.log(result);
    navigate("/");
  };

  return (
    <div className="product">
      <h1>hello add product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />

      <button className="btn-reg" onClick={updateProduct}>
        Insert
      </button>
    </div>
  );
};

export default UpdateProduct;

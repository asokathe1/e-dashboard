import React from "react";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [error, setError] = useState("false");

  const addProduct = async () => {
    console.log(!name);

    if (!name || !price || !category || !brand) {
      setError(true);
      return false;
    }
    console.log(name, price, category, brand);
    const userid = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userid);
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    let result = await fetch("http://localhost:5000/add-product", {
      method: "Post",
      body: JSON.stringify({ name, price, userid, category, brand }),
      mode: "cors",
      headers: headers,
      //  {
      //   "Content-Type": "application.json",
      // },
    });
    // console.log(result);
    let fresult = await result.json();
    console.log(fresult);
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
      {error && !name && (
        <span className="invalid-input"> Enter Valid Price </span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input"> Enter Valid Category </span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input"> Enter Valid Brand </span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Add product"
        value={brand}
        onChange={(e) => {
          setBrand(e.target.value);
        }}
      />
      {error && !brand && (
        <span className="invalid-input"> Enter Valid Name </span>
      )}
      <button className="btn-reg" onClick={addProduct}>
        Insert
      </button>
    </div>
  );
};

export default AddProduct;

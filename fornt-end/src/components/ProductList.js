import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      method: "Get",
    });
    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);

  const delProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
    });
    result = await result.json();

    if (result) {
      alert(" record delete");
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1> Product List</h1>
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Brand</li>
        <li>Action</li>
      </ul>
      {products.map((item, index) => (
        <ul key={index}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.brand}</li>
          <li>
            <button className="" onClick={() => delProduct(item._id)}>
              delete
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;

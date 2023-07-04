import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      method: "Get",
      headers:{
        authorization:`${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);

  const delProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5000/products/${id}`, {
      method: "Delete",
      headers:{
        authorization:`${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();

    if (result) {
      alert(" record delete");
      getProducts();
    }
  };

  const searchHandle = async(event) =>{
   let key = event.target.value; 
   if(key){     
    let result = await fetch(`http://localhost:5000/search/${key}`,{
    headers:{
      authorization:`${JSON.parse(localStorage.getItem('token'))}`
}

    })
    result= await result.json();
   
    if(result){
      // result.toLocaleLowerCase()
      setProducts(result)
    }
    else {
      getProducts()
    }

    }


  }

  return (
    <div className="product-list">
      <h1> Product List</h1>
      <input type="text" placeholder="Serach Product" className="search-product" onChange={searchHandle} /> 
      <ul>
        <li>S.no</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Brand</li>
        <li>Action</li>
      </ul>
      {
      
      products.length>0 ? products.map((item, index) => (
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
            <button>
              <Link to={"/update/" + item._id}>update</Link>
            </button>
          </li>
        </ul>
      )
      ):<h1>no record found</h1>}
    </div>
  );
};

export default ProductList;

const express = require('express');
require('./db/config');
// process.on('uncaughtException', function (err) {
//     console.log(err);
//   });

const User = require("./db/users");
const Product = require("./db/Products");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.post("/register",async (req,resp)=> {

    let user = new User(req.body); 
    console.log(user);
    // return "sucess"
    let result = await user.save();
    result= result.toObject();
    delete result.password;
    resp.send(result)
})

app.post("/login", async(req,resp)=> {
  // console.log(resp.body);

   

 if(req.body.password && req.body.email){
  let user = await User.findOne(req.body).select("-password");
  if(user){
    resp.send(user)
  }
  else  {resp.send("no user found") }
 }
 else {resp.send("no user found")}
 
})

//  Product Api Intergration 

app.post("/add-product",async (req,resp)=> {

  let product = new Product(req.body); 
  console.log(product);
  // return "sucess"
  let result = await product.save();
  resp.send(result)
})


//  Product Api get 

app.get("/products",async (req,resp)=> {

  let products = await Product.find();
  if(products.length>0){
    resp.send(products)
      }
      else {" no products Found"}
})

app.delete("/products/:id",async (req,resp)=> {

  let id = req.params.id;
  // resp.send(req.params.id);
  const result = await Product.deleteOne({_id:id})
  resp.send(result);
  });

// app.listen(5000);
const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// throw new Error('An error occurred');


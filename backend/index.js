const express = require('express');
require('./db/config');
// process.on('uncaughtException', function (err) {
//     console.log(err);
//   });

const User = require("./db/users");
const Product = require("./db/Products");
const JWT = require('jsonwebtoken');
const jwtkey = 'e-com';
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
    if(user){
      JWT.sign({result},jwtkey,{expiresIn:"1h"},(err,token) =>{
        if(err){
          resp.send({result:"something went wrong"})
        }
      resp.send({result,auth:token})
      })
      
    }
})

app.post("/login", async(req,resp)=> {

  if(req.body.password && req.body.email){
  let user = await User.findOne(req.body).select("-password");
  if(user){
    JWT.sign({user},jwtkey,{expiresIn:"1h"},(err,token) =>{
      if(err){
        resp.send({result:"something went wrong"})
      }
    resp.send({user,auth:token})
    })
    
  }
  else  {resp.send("no user found") }
 }
 else {resp.send("no user found")}
 
})

//  Product Api Intergration 

app.post("/add-product",verifyToken,async (req,resp)=> {

  let product = new Product(req.body); 
  console.log(product);
  // return "sucess"
  let result = await product.save();
  resp.send(result)
})


//  Product Api get 

app.get("/products",verifyToken,async (req,resp)=> {

  let products = await Product.find();
  if(products.length>0){
    resp.send(products)
      }
      else {" no products Found"}
})

// Product Api for Delete
app.delete("/products/:id",verifyToken,async (req,resp)=> {

  let id = req.params.id;
  const result = await Product.deleteOne({_id:id})
  resp.send(result);
  });
// Product Api for Update 
app.get("/products/:id",verifyToken,async(req,resp)=>
{       
    let id = req.params.id;
      let result = await Product.findOne({_id:id})
      if(result)
      {
        resp.send(result)
      }
      else{
        resp.send("no record found")
      }
        });

app.put("/products/:id",verifyToken, async (req,resp) => {

    let result = await Product.updateOne(
      {_id:req.params.id},
      {
        $set : req.body
      }
    )
    resp.send(result);

})        



// Product Api for Search

app.get("/search/:key",verifyToken, async (req,resp)=>{

  let result = await Product.find({

    "$or":[
      {name:{$regex:req.params.key}},
      {price:{$regex:req.params.key}},
      {category:{$regex:req.params.key}},
      {brand:{$regex:req.params.key}}
    ]
  });
  await resp.send(result)
})

// JWT Token Authentication Api

function verifyToken(req,resp,next){

  let token = req.headers['authorization']
  if(token){
            console.log("if wala ",token)
        // token = token.split('')[1]
        JWT.verify(token,jwtkey, (err,valid)=>{
          if(err){
            resp.status(401).send({result: "Please provide valid token"})

          }else {
                next()
          }
        })
  } else{
        resp.status(403).send("Please send token with Header")
  }
  console.log("middleware call",token)
  

}





// app.listen(5000);
const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
// throw new Error('An error occurred');


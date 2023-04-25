

const express = require('express');
require('./db/config');
// process.on('uncaughtException', function (err) {
//     console.log(err);
//   });

const User = require("./db/users");
const app = express();
app.use(express.json());

app.post("/register",async (req,resp)=> {

    let user = new User(req.body); 
    console.log(user);
    // return "sucess"
    let result = await user.save();
    resp.send("result")
})

// app.listen(5000);
const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// throw new Error('An error occurred');
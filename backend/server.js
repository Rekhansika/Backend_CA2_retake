const express = require('express');
const app = express();
app.use(express.json());

const userData = [
    {username:"alice",age:"25",email:"alice@gmail.com"},
    {username:"bob",age:"30",email:"bob@gmail.com"},
    {username:"charlie",age:"28",email:"charlie@gmail.com"}
]

app.get('/',(req,res)=>{
    res.send("Server is running");
});

app.get("/userdetails",(req,res)=>{
    try {
        const{username} = req.body;
        if(username==""){
            return res.status(400).send("User paramater cannot be empty");
        }
        const data = userData.find(u=>u.username===username);
        if(!data){
            return res.status(400).send({"message":"User not found"})
        }
        return res.status(200).send({"message":"User found","data":data});

    } catch (error) {
        console.log(error)
        return res.status(500).send({"message":"Internal server error",error})
    }
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})
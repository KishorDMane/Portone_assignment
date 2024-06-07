const express= require('express')
const app = express();

const {payment_intent}=require("./router/createpaymentIntent.router");

app.use(express.json());

app.use("/api", payment_intent);
 
app.get("/get", (req,res)=>{
res.send("working")
})



app.listen(8000 , ()=>{
console.log("on 8000");
} )
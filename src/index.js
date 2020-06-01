const express=require("express");
const app=express();
const teachersRouter=require('./routers/teachersRouter.js')
const bodyParser=require("body-parser")

app.use(bodyParser.json());
app.get('/',(req,res)=>{
res.send("welcome to home page");
});
app.use('/teachers',teachersRouter);

app.listen(8000,()=>{
  console.log("connected to 8000");
});

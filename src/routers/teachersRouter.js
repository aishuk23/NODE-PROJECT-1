const express=require("express");
const app=express();
const teachers=require("../models/teachers");
teachersRouter=express.Router();

teachersRouter
.get('/',(req,res)=>{
  res.json({teachers});
})
///////////////////////////////////////////
.get('/:id',(req,res)=>{
  try{
const teacher=teachers.find(c=>{

  return c.id===parseInt(req.params.id)
});
if(teacher){
res.status(200).json(teacher);
}
else{
  res.status(400).send("internal prob");
}
}catch(error){
  res.status(500).send("server prob");
}
})
///////////////////////////////////////////
.post('/',(req,res)=>{
  if(req.body.fname && req.body.age<98){
     const id=teachers.length+1;
 const t={
   id,
   ...req.body
 };
teachers.push(t);
res.status(200).send(t);
  }
else{
res.status(400).send("insufficient data");
}

})
///////////////////////////////////////////////

.patch('/:id',(req,res)=>{
  try{
let teacher=teachers.find(teacher=>{
  return teacher.id===parseInt(req.params.id)
});


if(teacher){
  
  teacher={
  ...teacher,
...req.body
}
res.status(200).send(teacher);
} 
  else{

res.status(400).send("insufficient data");
  }
}
  catch(error){
res.status(500).send("server prob");
  }
})

.delete('/:id',(req,res)=>{
try{
const teacher=teachers.find(c=>{

  return c.id===parseInt(req.params.id)
});
const index=teachers.indexOf(teacher);
teachers.splice(index,1);
res.status(200).json({});

}catch(error){
  res.status(500).send("server prob");
}
});
module.exports=teachersRouter;

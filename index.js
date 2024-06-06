const express=require('express')
const app=express()
const port=process.env.PORT || 3000
const path=require('path')
const http=require('http')
const fs=require('fs')

const sourcefolder=path.join(__dirname,"../")
app.use(express.static(sourcefolder));
app.get("/",(req,res)=>{
    res.sendFile(sourcefolder+"/index.html")
})
app.get("/home", (req, res) => {
  res.sendFile(sourcefolder + "/index.html");
});
app.get("/skills", (req, res) => {
  res.sendFile(sourcefolder + "/skills.html");
});

app.get("/projects", (req, res) => {
  res.sendFile(sourcefolder + "/projects.html");
});

app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Server running at port ${port}`)
})
const express=require("express");
const app=express();
const cors=require("cors")
const fileUpload=require("express-fileupload");
const PORT=process.env.PORT||5000;
require("./db/sql");

app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload())

app.use("/",require("./routers/index"))

app.listen(PORT,()=>{
    console.log("Connected",PORT);
})
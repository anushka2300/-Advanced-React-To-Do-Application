const express=require('express');
const app=express();
const bodyParser=require('body-parser');
require("dotenv").config();
const cors=require('cors');
require('./db')
app.use("/files",express.static("files"));
const auth=require('./routes/auth')
const task=require('./routes/crud')
const PORT =process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(cors());

app.use('/auth',auth);
app.use('/task',task);

app.listen(PORT, ()=>{
    console.log("server is running")
})


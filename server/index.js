const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const app=express();
const cookieParser = require('cookie-parser');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
app.use(cors());
app.use(express.json());
app.use(cookieParser());
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_NAME)
.then(()=>{
    console.log("Connected to the database!")
}).catch((err)=>{
    console.log("Not connected due to ",err)
})

app.use(require("./Admin/admin"));
app.use(require("./Patient/patient"));
app.use(require("./Doctor/doctor"));
app.use(require("./BookAppointments/bookAppointments"));

app.listen(5000,()=>{
    console.log("Listening to the port 5000!")
})
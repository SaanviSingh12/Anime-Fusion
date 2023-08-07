// import express from "express";

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 8080;
//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'./ecommerce/build')));



//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./ecommerce/build/index.html'));
})

//PORT


//run listen
app.listen(PORT,function(err){                                                              /*Listener to localhost */ 
    if(err){
        console.log('Error in running the server');
    }
    console.log('Exress server is runnning ');
})


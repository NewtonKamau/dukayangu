import express from "express"
import dotenv from "dotenv"
import connectDB from './config/db.js'
import {notFound,errorHandler} from "./middleware/errorMiddleWare.js";
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoute.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();
const app = new express();
connectDB()
app.use(express.json())
app.use("/api/products",productRoutes); 
app.use("/api/users", userRoutes); 
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))
 
app.get("/api/products", (req, res) => {
    res.json(products)
});
app.get("/api/products/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id)
    res.json(product);
});
//custom error message
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
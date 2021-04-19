import mongoose from "mongoose";
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productsModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        //first delete any existing data
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        //insert many
        const createdUsers = await User.insertMany(users)
        //get the admin user
        const adminUser = createdUsers[0]._id

        //create product and map each product to a user
        const sampleProducts = products.map(products => {
            //all products will be asigned to the admin user for now
            return {...products, user:adminUser}
        })
        await Product.insertMany(sampleProducts)
        console.log("Data ");
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
    
}
const destroytData = async () => {
  try {
    //first delete any existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

   
    console.log("Data destroyed");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
if (process.argv[2] === "-d") {
    destroytData()
} else {
    importData()
}
import asyncHandler from 'express-async-handler';

import Product from '../models/productsModel.js';

//@desc fetch all products
//@route GET api/products
//access Public
const getProducts = asyncHandler (async (req,res) => {
 const products = await Product.find({});
 res.json(products);
})

//@desc fetch product by id
//access public 
const getProductById = asyncHandler(async (req, res) => {
 const product = await Product.findById(req.params.id);
 if (product) {
   res.json(product);
 } else {
   res.status(404);
   throw new Error("Not Found");
 }
});

export {
    getProducts,
    getProductById
}
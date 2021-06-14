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
//route GET /api/products/:id
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
//@desc delete product by id
//route  DELETE /api/products/:id
//access private admin only 
const deleteProduct= asyncHandler(async (req, res) => {
 const product = await Product.findById(req.params.id);
 if (product) {
   await product.remove()
   res.json({message:"Product removed"});
 } else {
   res.status(404);
   throw new Error("Not Found");
 }
});
//@desc create product by
//route  POST /api/products/
//access private admin only 
const createProduct= asyncHandler(async (req, res) => {
 const product = new Product({
  name:"Dell Laptop",
  price:100,
  user:req.user._id,
  image:"./images.laptop.jpg",
  brand:"Dell",
  category:"laptop"
  countInStock:3,
  numReviews:2,
  description:"A new 10th gen laptop with great specs"

 })
 const createdProduct = await product.save()
 res.status(201).json(createdProduct)


});
//@desc update a product
//route  PUT /api/products/id}
//access private admin only 
const updateProduct= asyncHandler(async (req, res) => {
 const {name,price,description,image,brand,category,countInStock} = req.body
 const product = await Product.findById(req.params.id)
 if (product) {
  product.name = name
  product.price = price
  product.description = description
  product.image = image
  product.brand = brand
  product.category = category
  product.countInStock = countInStock
 const updatedProduct = await product.save()
 res.status(201).json(updatedProduct)
 }else{
  res.status(404)
  throw new Error("Product not found")
 }



});

export {
    getProducts,
  getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}
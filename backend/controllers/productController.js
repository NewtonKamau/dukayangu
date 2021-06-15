import asyncHandler from 'express-async-handler';

import Product from '../models/productsModel.js';

//@desc fetch all products
//@route GET api/products
//access Public
const getProducts = asyncHandler (async (req,res) => {
  const pageSize = 2
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword ? {
    name :{
      $regex: req.query.keyword
      $options : 'i'
    }
  }: {}
  const count = await Product.countDocuments({...keyword})
 const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page-1))
 res.json({products,page,pages:Math.ceil(count/pageSize)});
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
  category:"laptop",
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
//@desc create new review to a  product
//route  POST /api/products/reviews}
//access private  
const createProductReview= asyncHandler(async (req, res) => {
 const {rating,comment} = req.body
 const product = await Product.findById(req.params.id)
 if (product) {
  
 const alreadyReviewed = products.reviews.find(r => r.user.toString() == req.user._id.toString())
 if(alreadyReviewed){
  res.status(400)
  throw new Error("You have reviewed this product")
 }
 const review = {
  name :req.user.name,
  rating : Number(rating),
  comment ,
  user : req.user._id
 }

 product.reviews.push(review)
 product.numReviews = product.reviews.length
 product.rating = product.reduce((acc,item) => item.rating + acc , 0) / product.reviews.length
 await product.save()
 res.status(201).json({message:"Review added"})
 }else{
  res.status(404)
  throw new Error("Product not found")
 }



});

//@desc get top rated products
//route  GET /api/products/top
//access public
const getTopProducts= asyncHandler(async (req, res) => {
 const product = await Product.find({}).sort({rating: -1}).limit(5)
 res.json(products)



});

export {
    getProducts,
  getProductById,
    deleteProduct,
    createProduct,
    updateProduct,createProductReview,
    getTopProducts
}
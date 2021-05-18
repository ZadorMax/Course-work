import express from 'express';
import Product from '../models/productModel';
import data from '../data';
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/:id', expressAsyncHandler(async (req,res) => {
  const product = await Product.findById(req.params.id);
  if(product){
      res.send(product);
  }
  else{
      res.status(404).send({message: "Product not found"});
  }
}));

productRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req,res) => {
    // await Product.remove({}); for removing all users
     const createdProducts = await Product.insertMany(data.products);
     res.send({createdProducts});
 }));
 
 

 productRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const product = new Product({
        name: 'sample name ' + Date.now(),
        catgory: 'sample category',
        image: '/images/d1.jpg',
        price: 0,
        brand: 'sample brand',
        numReviews: 0,
        countInStock: 0,
      });
      const createdProduct = await product.save();
      res.send({ message: 'Product Created', product: createdProduct });
    })
  );


  productRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.catgory = req.body.catgory;
        product.brand = req.body.brand;
        product.countInStock = req.body.countInStock;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

  productRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

 export default productRouter;


import express from 'express';
import Product from '../models/productModel';
import data from '../data';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req,res) => {
    // await Product.remove({}); for removing all users
     const createdProducts = await Product.insertMany(data.products);
     res.send({createdProducts});
 }));
 
 productRouter.get('/:id', expressAsyncHandler(async (req,res) => {
     const product = await Product.findById(req.params.id);
     if(product){
         res.send(product);
     }
     else{
         res.status(404).send({message: "Product not found"});
     }
 }));
 export default productRouter;
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter';

dotenv.config();

// const mongodbUrl = config.MONGODB_URL;
// mongoose.connect(mongodbUrl,{useNewUrlParser: true,
//     useUnifiedTopology: true, useCreateIndex: true}).catch((error) => console.log(error.reason));

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/drug-store',
        {useNewUrlParser: true,
         useUnifiedTopology: true,
          useCreateIndex: true,}).catch((error) => console.log(error.reason));

// app.get("/api/products",(req, res) => {
//     res.send(data.products);
// });

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);


// app.get("/api/products/:id",(req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id === productId);
//     if(product)
//         res.send(product);
//     else
//         res.status(404).send({msg:"Product not found"});
// });

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });


app.listen(5000, () => {console.log("Server started at http://localhost:5000")});
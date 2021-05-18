import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/routUser.js';
import productRouter from './routers/routProd';
import orderRouter from './routers/routOrder.js';

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
app.use('/api/orders', orderRouter);

app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});

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
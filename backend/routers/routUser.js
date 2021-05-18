import express from 'express';
import User from '../models/userModel';
import data from '../data';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { getToken } from '../utils.js';


const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async (req,res) => {
   // await User.remove({}); for removing all users
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin',expressAsyncHandler(async (req, res) =>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: getToken(user),
            });
            return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
    
}));

userRouter.post('/register',
    expressAsyncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: getToken(createdUser),
      });
    }));


export default userRouter;
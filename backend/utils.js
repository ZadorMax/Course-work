import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.Admin,
    }, 
    process.env.JWT_SECRET || 'secret',
     {
         expiresIn: '2d',
        });
};
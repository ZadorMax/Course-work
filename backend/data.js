import bcrypt from 'bcryptjs';
export default {

    users: [
    {
        name: 'Zador',
        email: 'maxzador01@gmail.com',
        password: bcrypt.hashSync('abcd', 8),
        isAdmin: true,
    },
    {
        name: 'Bob',
        email: 'bob@gmail.com',
        password: bcrypt.hashSync('bob', 8),
        isAdmin: false,
    },

    ],
    products:[
    {
        //_id:'1',
        name: "Pills1",
        catgory: 'Medicaments',
        image:'/images/d1.jpg',
        price:10,
        brand: 'Darnytsa',
        numReviews: 5,
        countInStock: 0,
    },
    {
       // _id:'2',
        name: "Cream1",
        catgory: 'Cosmetics',
        image:'/images/d1.jpg',
        price:20,
        brand: 'Darnytsa',
        numReviews: 2,
        countInStock: 5,
    },
    {
       // _id:'3',
        name: "Toothbrush1",
        catgory: 'Hygiene',
        image:'/images/d1.jpg',
        price:30,
        brand: 'Darnytsa',
        numReviews: 3,
        countInStock: 1,
    },
    {
      //  _id:'4',
        name: "Toothbrush2",
        catgory: 'Hygiene',
        image:'/images/d1.jpg',
        price:30,
        brand: 'Darnytsa',
        numReviews: 3,
        countInStock: 5,
    }
]
}
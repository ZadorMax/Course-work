import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import { 
    productDetailsReducer,
    productListReducer,
    productCreateReducer,
    productDeleteReducer, 
    productUpdateReducer,} from './reducers/reducerProd';
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/reducerCart';
import Cookie from 'js-cookie';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMineListReducer,
    orderListReducer,
    orderDeliverReducer,
  } from './reducers/reducerOrder';
import { userRegisterReducer, userSigninReducer } from './reducers/reducerUser';



const initialState = {
    cart: {cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
      paymentMethod: 'PayPal',
    },
    userSignin:{
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    },
    
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
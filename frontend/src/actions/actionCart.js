import axios from "axios"
import Cookie from "js-cookie"
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD,} from "../constants.js";

const addToCart = (productId, qty) => async (dispatch, getState) =>{
    try {
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload:{
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty,
        }});
        // const{cart:{cartItems}} = getState();
        // Cookie.set("cartItems", JSON.stringify(cartItems));//save items in cart
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
        
    }
}

const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
    // const{cart:{cartItems}} = getState();
    //     Cookie.set("cartItems", JSON.stringify(cartItems));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  };

export {addToCart, removeFromCart,saveShippingAddress,savePaymentMethod} 
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  deliverOrder, detailsOrder, payOrder } from '../actions/actionOrder';
import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants.js';


function OrderScreen(props) {
  const orderId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [sdkReady, setSdkReady] = useState(true);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
        const { data } = await Axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (
        !order ||
        successPay ||
        successDeliver ||
        (order && order._id !== orderId)
      ) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch({ type: ORDER_DELIVER_RESET });
        dispatch(detailsOrder(orderId));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPayPalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);
  
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
      dispatch(deliverOrder(order._id));
    };
  

return loading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error}</div>
    ) : (
    <div>
      <h1>Замовлення {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Доставка</h2>
                <p>
                  <strong>Повне ім'я:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Адреса: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  
                    <p>Доставлено {order.deliveredAt}</p>
                 
                ) : (
                  <p>Не доставлено</p>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Оплата</h2>
                <p>
                  <strong>Спосіб:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  
                    <p>Оплачено о{order.paidAt}</p>
                  
                ) : (
                 <p>Неоплачено</p>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Замовлення товарів</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Всумі замовлення</h2>
              </li>
              <li>
                <div className="row">
                  <div>Товари</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Доставка</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              
              <li>
                <div className="row">
                  <div>
                    <strong> Сума Замовлення</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {sdkReady ? (
                    <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  ></PayPalButton>
                  ) : (
                    loading
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <p>Loading...</p>}
                  {errorDeliver && (
                    <p>Error...</p>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Доставка замовлення
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
);
}
export default OrderScreen;
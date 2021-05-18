import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Link } from 'react-router-dom';
import { signout } from './actions/actionUser';
import './App.css';
import CartScreen from './Screens/scrCart';
import HomeScreen from './Screens/scrMain';
import PlaceOrderScreen from './Screens/scrMakeOrder';
import ProductScreen from './Screens/scrProd';
import RegisterScreen from './Screens/scrRegister';
import SigninScreen from './Screens/scrSignin';
import ShippingAddressScreen from './Screens/scrAddress';
import PaymentMethodScreen from './Screens/scrPayment';
import OrderScreen from './Screens/scrOrder';
import OrderHistoryScreen from './Screens/scrOrderHis';
import ProductListScreen from './Screens/sctListProd';

import ProductEditScreen from './Screens/scrEditProd';
import OrderListScreen from './Screens/scrListOrder';


function AdminRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };


  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <Link to="/">Аптека</Link>

          </div>
          <div className="header-links">
            <Link to="/cart">
              Кошик
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                <li>
                    <Link to="/orderhistory">Історія замовлень</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Вийти з акаунту
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Увійти в акаунт</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Товари</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Замовлення</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>

        <main className="main">
          <div className="content">
            <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/product/:id" component={ProductScreen} exact></Route>
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <AdminRoute
              path="/productlist"
              component={ProductListScreen}
            ></AdminRoute>
            <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          </div>
        </main>

        <footer className="footer">
          All rights reserved
      </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;

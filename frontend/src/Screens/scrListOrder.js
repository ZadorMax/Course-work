import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/actionOrder';
function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);
  
  return (
    <div>
      <h1>Замовлення</h1>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>Error</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Корист</th>
              <th>Дата</th>
              <th>Всього</th>
              <th>Оплачено</th>
              <th>Доставлено</th>
              <th>Деталі</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default OrderListScreen;
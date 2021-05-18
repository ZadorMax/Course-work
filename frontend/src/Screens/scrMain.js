import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/actionProd';


function HomeScreen(props) {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
    };
  }, [])

  return loading ? <div>Loading...</div> :
    error ? <div>{error}</div> : (
      <ul className="products">
        {
          products.map((product) =>(
            <li key={product._id}>
              <div className="product">
                <Link to={'/product/' + product._id}>{product.name}
                  <img className="product-image" src={product.image} alt="product"></img>
                </Link>
                
                <div className="product-brand">Виробник {product.brand}</div>
                <div className="product-price">Ціна ₴{product.price}</div>
                <div className="product-rating">Відгуки: {product.numReviews}</div>
              </div>
              
            </li>
          ))
        }
      </ul>
    )
    
}
export default HomeScreen;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/actionProd';
import { PRODUCT_UPDATE_RESET } from '../constants.js';
function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [catgory, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.catgory);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
    }
}, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          catgory,
          brand,
          countInStock,
        })
      );
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Редагувати товар {productId}</h1>
        </div>
        {loadingUpdate && <p>Loading</p>}
        {errorUpdate && {errorUpdate}}
        {loading ? (
          <p>Loading</p>
        ) : error ? (
         {error}
        ) : (
          <>
            <div>
              <label htmlFor="name">Назва</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Ціна</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Зображення</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="category">Категорія</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={catgory}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Виробник</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="countInStock">На складі</label>
              <input
                id="countInStock"
                type="text"
                placeholder="Enter countInStock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></input>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Оновити
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
export default ProductEditScreen;
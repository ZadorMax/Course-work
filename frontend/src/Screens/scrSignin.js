import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/actionUser';

function SigninScreen(props) {
    
    const userSignin = useSelector((state) => state.userSignin);
    const {userInfo, loading, error} = userSignin;  

    const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(() => {
        if (userInfo) {
          props.history.push(redirect);
        }
      }, [props.history, redirect, userInfo]);

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Увійти в акаунт</h1>
                </div>
                
                <div>
                    <label htmlFor="email">Почтова скринька</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className="primary button" type="submit">
                        Увійти
          </button>
                </div>
                <div>
                    <label />
                    <div>
                    Ще не має акаунту?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Створити акаунт
            </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default SigninScreen;
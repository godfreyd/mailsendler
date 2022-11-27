import React, { FC, useContext, useState } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const LoginForm: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const { store } = useContext(Context);

    return (
        <div>
            <input type="text" placeholder='Email' onChange={event => setEmail(event.target.value)} value={email}/>
            <input type='password' placeholder='Пароль' onChange={event => setPassword(event.target.value)} value={password}/>
            <button type='button' onClick={() => store.login(email, password)}>Войти</button>
            <button type='button' onClick={() => store.registration(email, password)}>Регистрация</button>
        </div>
    );
};

export default observer(LoginForm);
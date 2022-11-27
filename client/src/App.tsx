import React, { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import './App.css';
import LoginForm from './components/LoginForm';
import { IUser } from './models/responce/AuthResponse';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);

    } catch (error) {
      console.log(error);
      
    }
  }
  if(store.isLoading) {
    return <div>Загрузка ...</div>
  }

  if(!store.isAuth) {
    return (
      <div>
        <LoginForm/>
        <button type='button' onClick={getUsers}>Получить список пользователей</button>
      </div>
   );
  }

  return (
    <div className="App">
      <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}`: 'Авторизуйтесь'}</h1>
      <h1>{store.user.isActivated ? 'Аккаунт подтвержден': 'Активируйте аккаунт!'}</h1>
      <button type='button' onClick={() => store.logout()}>Выйти</button>
      <div>
        <button type='button' onClick={getUsers}>Получить список пользователей</button>
      </div>
      {users.map(user => <div key={user.email}>{user.email}</div>)} 
    </div>
  );
}

export default observer(App);

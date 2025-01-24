import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://yeticave-second.loc/sign_up.php', {
        email, password, name, avatar, message
      });
      let data = response.data;
      console.log(data);
      if(data.status === 'success') {
        window.location.href='/login';
      } else {
        setErrors(data.errors);
      }
    }
    catch (error) {
      console.log('This is an error: ', error);
    }
  }

  return (
    <form className="form container form--invalid" action="../sign_up.php" method="post" autoComplete="off" encType="multipart/form-data" onSubmit={handleSubmit}>
    {/* <span className="form__error form__error--bottom"><?=  !empty($errors) ? 'Пожалуйста, исправьте ошибки в форме.' : ''?></span> */}
      <h2>Регистрация нового аккаунта</h2>
      <div className="form__item">
        <label htmlFor="email">E-mail <sup>*</sup></label>
        <input id="email" type="text" name="email" placeholder="Введите e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {/* <span className="form__error"> <?=$errors['email'] ?? ''?></span> */}
      </div>
      <div className="form__item">
        <label htmlFor="password">Пароль <sup>*</sup></label>
        <input id="password" type="password" name="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {/* <span className="form__error"><?=$errors['password'] ?? ''?></span> */}
      </div>
      <div className="form__item">
        <label htmlFor="name">Имя <sup>*</sup></label>
        <input id="name" type="text" name="name" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)}/>
        {/* <span className="form__error"><?=$errors['name'] ?? ''?></span> */}
      </div>
    <div>
        <label>Аватар</label>
        <div className="form__input-file">
            <input type="file" id="avatar" name="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
            {/* <span className="form__error"><?=$errors['image'] ?? ''?></span> */}
        </div>
    </div>
      <div className="form__item">
        <label htmlFor="message">Контактные данные <sup>*</sup></label>
        <textarea id="message" name="message" placeholder="Напишите как с вами связаться" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        {/* <span className="form__error"><?=$errors['message'] ?? ''?></span> */}
      </div>
      <button type="submit" className="button">Зарегистрироваться</button>
      <Link className="text-link" to="/login?>">Уже есть аккаунт</Link>
    </form>
  )
}

export default SignUp
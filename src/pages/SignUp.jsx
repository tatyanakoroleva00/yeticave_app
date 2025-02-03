import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
    avatar: '',
    message: '',
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({ ...prevFormValues, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://yeticave-second.loc/sign_up2.php', {
        email, password, name, avatar, message
      });
      // let data = response.data;
      const { data, errors } = response.data;
      console.log(data);
      console.log(errors);
      if (errors) setErrors;
      if (data.status === 'success') {
        // window.location.href='/login';
      } else {
        setErrors(data.errors);
      }
    }
    catch (error) {
      console.log('This is an error: ', error);
    }
  }

  return (
    <form className="form container form--invalid" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
      <span className="form__error form__error--bottom">{Object.keys(errors).length > 0 ? 'Пожалуйста, исправьте ошибки в форме.' : ''}</span>
      <h2>Регистрация нового аккаунта</h2>
      <div className="form__item">
        <label htmlFor="email">E-mail <sup>*</sup></label>
        <input id="email" type="text" name="email" onChange={handleInputChange} placeholder="Введите e-mail" value={formValues.email} />
        <span className="form__error">{errors.email ? errors.email : ''}</span>
      </div>
      <div className="form__item">
        <label htmlFor="password">Пароль <sup>*</sup></label>
        <input id="password" type="password" name="password" onChange={handleInputChange} placeholder="Введите пароль" value={formValues.password} />
        {/* <span className="form__error"><?=$errors['password'] ?? ''?></span> */}
      </div>
      <div className="form__item">
        <label htmlFor="name">Имя <sup>*</sup></label>
        <input id="name" type="text" name="name" onChange={handleInputChange} placeholder="Введите имя" value={formValues.name}/>
        {/* <span className="form__error"><?=$errors['name'] ?? ''?></span> */}
      </div>
      <div>
        <label>Аватар</label>
        <div className="form__input-file">
          <input type="file" id="avatar" name="avatar" onChange={handleInputChange} value={formValues.avatar} />
          {/* <span className="form__error"><?=$errors['image'] ?? ''?></span> */}
        </div>
      </div>
      <div className="form__item">
        <label htmlFor="message">Контактные данные <sup>*</sup></label>
        <textarea id="message" name="message" placeholder="Напишите как с вами связаться" value={formValues.message} onChange={handleInputChange}></textarea>
        {/* <span className="form__error"><?=$errors['message'] ?? ''?></span> */}
      </div>
      <button type="submit" className="button">Зарегистрироваться</button>
      <Link className="text-link" to="/login?>">Уже есть аккаунт</Link>
    </form>
  )
}

export default SignUp
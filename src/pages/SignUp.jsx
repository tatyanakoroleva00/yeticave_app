import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    avatar: '',
    name: '',
    message: '',
  });
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  console.log(formValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prevFormValues => ({ ...prevFormValues, [name]: value }));
  };

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues(prev => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    setErrors({});

    const { email, password, avatar, name, message } = formValues;
    e.preventDefault();
    setErrors({}); // Очищаем ошибки перед отправкой формы

    axios.post('http://yeticave-second.loc/sign_up2.php', {
      email, password, avatar, name, message,
    }, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        const {errors, data, status, message, file} = response.data;
        console.log(data);
        console.log(status);
        console.log(response);
        if (errors) {
          // console.log(data);
          if (Object.keys(errors).length > 0) {
            setErrors(errors);
          }
        }
        if (status === 'success') {
          alert('Успешная регистрация!');
          window.location.href = '/login';
        }


      }) // This parenthesis and curly brace were missing
      .catch(error => {
        console.error("There was an error!", error);
      });
};

  const handleRemoveFile = (e) => {
    e.preventDefault();
    setFormValues(prev => ({...prev, avatar : ''}));
    setPreview(null);
  };

  return (
    <form className="form container form--invalid" encType="multipart/form-data" onSubmit={handleSubmit}>
      <span className="form__error form__error--bottom">
        {Object.keys(errors).length > 0 ? 'Пожалуйста, исправьте ошибки в форме.' : ''}</span>
      <h2>Регистрация нового аккаунта</h2>
      <div className="form__item">
        <label htmlFor="email">E-mail <sup>*</sup></label>
        <input id="email" type="text" name="email" onChange={handleInputChange} placeholder="Введите e-mail" value={formValues.email} />
        {errors.email && <span className="form__error">{errors.email}</span>}
      </div>
      <div className="form__item">
        <label htmlFor="password">Пароль <sup>*</sup></label>
        <input id="password" type="password" name="password" onChange={handleInputChange} placeholder="Введите пароль" value={formValues.password} />
        {errors.password && <span className="form__error">{errors.password}</span>}
      </div>
      <div className="form__item">
        <label htmlFor="name">Имя <sup>*</sup></label>
        <input id="name" type="text" name="name" onChange={handleInputChange} placeholder="Введите имя" value={formValues.name} />
        {errors.name && <span className="form__error">{errors.name}</span>}
      </div>
      <div>
        <label>Аватар <sup>*</sup></label>
        <div className="form__input-file">
          {preview && (
            <>
              <img src={preview} alt="Загруженное изображение" width="100px " />
              <button className="remove-button" onClick={handleRemoveFile}>УДАЛИТЬ</button>
            </>)}
            {!preview && <input type="file" onChange={handleFileChange} id="lot_img" name="avatar" />}
          {errors.avatar && <span className="form__error">{errors.avatar}</span>}
        </div>
      </div>
      <div className="form__item">
        <label htmlFor="message">Контактные данные <sup>*</sup></label>
        <textarea id="message" name="message" placeholder="Напишите как с вами связаться" value={formValues.message} onChange={handleInputChange} ></textarea>
        {errors.message && <span className="form__error">{errors.message}</span>}
      </div>
      <button type="submit" className="button">Зарегистрироваться</button>
      <Link className="text-link" to="/login">Уже есть аккаунт</Link>
    </form>
  )
}

export default SignUp
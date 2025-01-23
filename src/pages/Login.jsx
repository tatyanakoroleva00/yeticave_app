import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Login = ({onLogin}) => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [errors, setErrors] = useState({});

const handleSubmit = async (e) => {
  e.preventDefault();
  setErrors({}); // Сброс ошибок перед новой попыткой
  try {
    const response = await axios.post('http://yeticave-second.loc/login.php', {
      email, password
    });
    let data = response.data;
    if(data.status === 'success') {
      localStorage.setItem('auth', JSON.stringify(data.user));
      localStorage.setItem('user', JSON.stringify(data.user['name']));
      onLogin(data);
      window.location.href = '/';
    } else {
      setErrors(data.errors);
    }
  } catch (error) {
    console.log('There is an error:', error);
  }
};



  return (
    <form className="form container" method="post" onSubmit={handleSubmit}>
      {errors.message && <span class="form__error" >{errors.message}</span>}
      <h2>Вход</h2>
      <div className="form__item">
          <label for="email">E-mail <sup>*</sup></label>
          <input id="email" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Введите e-mail" />
          {errors.email && <span class="form__error">{errors.email}</span>}
      </div>
      <div className="form__item">
          <label for="password">Пароль <sup>*</sup></label>
          <input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Введите пароль"/>
          {errors.password && <span class="form__error">{errors.password}</span>}
          
      </div>
      {/* <div><input type="checkbox" name="remember" id="remember" <?php echo isset($_COOKIE['email']) ? 'checked' : ''; ?>/><label>&nbsp;Запомнить меня</label></div><br> */}
      <button type="submit" name="submit" className="button">Войти</button>
    </form>

  )
}

export default Login
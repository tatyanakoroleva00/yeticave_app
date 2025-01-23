import React from 'react'

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

  }

  return (
    <form className="form container form--invalid" action="../sign_up.php" method="post" autocomplete="off" encType="multipart/form-data" onSubmit={handleSubmit}>
    {/* <span className="form__error form__error--bottom"><?=  !empty($errors) ? 'Пожалуйста, исправьте ошибки в форме.' : ''?></span> */}
      <h2>Регистрация нового аккаунта</h2>
      <div className="form__item">
        <label for="email">E-mail <sup>*</sup></label>
        <input id="email" type="text" name="email" placeholder="Введите e-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
        {/* <span className="form__error"> <?=$errors['email'] ?? ''?></span> */}
      </div>
      <div className="form__item">
        <label for="password">Пароль <sup>*</sup></label>
        <input id="password" type="password" name="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
        {/* <span className="form__error"><?=$errors['password'] ?? ''?></span> */}
      </div>
      <div className="form__item">
        <label for="name">Имя <sup>*</sup></label>
        <input id="name" type="text" name="name" placeholder="Введите имя" value=""/>
        {/* <span className="form__error"><?=$errors['name'] ?? ''?></span> */}
      </div>
    <div>
        <label>Аватар</label>
        <div className="form__input-file">
            <input type="file" id="avatar" name="avatar"/>
            {/* <span className="form__error"><?=$errors['image'] ?? ''?></span> */}
        </div>
    </div>
      <div className="form__item">
        <label for="message">Контактные данные <sup>*</sup></label>
        <textarea id="message" name="message" placeholder="Напишите как с вами связаться"></textarea>
        {/* <span className="form__error"><?=$errors['message'] ?? ''?></span> */}
      </div>
      <button type="submit" className="button">Зарегистрироваться</button>
      <a className="text-link" href="<?=$login_page;?>">Уже есть аккаунт</a>
    </form>
  )
}

export default SignUp
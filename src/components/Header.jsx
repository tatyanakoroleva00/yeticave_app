import React from 'react';
import { useState } from 'react';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <header className="main-header">
        <div className="main-header__container container">
            <h1 className="visually-hidden">YetiCave</h1>
            <a className="main-header__logo" href="/">
                <img src="src/assets/images/logo.svg" width="160" height="39" alt="Логотип компании YetiCave" />
            </a>
            <form className="main-header__search" method="get" action="search.php" autocomplete="off">
                <input type="search" className="search" placeholder="Поиск лота" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}/>
                <input className="main-header__search-btn" type="submit" name="find" value="Найти"/>
            </form>



             {/* <?php if (isset($_SESSION['user'])) : ?> */}
            
            <div><a className="main-header__add-lot button" href="/add">Добавить лот</a></div>
            
            {/* <? endif; ?>  */}
            {/* <nav className="user-menu">

                <?php if (isset($_SESSION['user'])) : ?>

                    <div className="user-menu__image">
                        <img src='<?=$_SESSION['user']['avatar'] ?? 'img/avatar.jpg'?>' width="40" height="40" alt="Аватар"/>
                    </div>
                    <div className="user-menu__logged">
                        <p><?= $_SESSION['user']['name'] ?? 'Неизвестный'?></p>
                        <p><a href="../controllers/logout.php">Выйти</a></p>
                    </div>

                <?php else: ?>

                    <ul className="user-menu__list">
                        <li className="user-menu__item">
                            <a href="sign_up.php">Регистрация</a>
                        </li>
                        <li className="user-menu__item">
                            <a href="login.php">Вход</a>
                        </li>
                    </ul>
                <? endif; ?>

            </nav> */}

        </div>
    </header>
  )
}

export default Header
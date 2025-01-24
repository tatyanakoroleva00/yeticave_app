import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Header = ({ user, setUser }) => {
    const [searchInput, setSearchInput] = useState('');
    const handleLogout = () => {
        axios.get('/controllers/logout.php')
            .then(() => {
                localStorage.removeItem('user');
                setUser(null);
            });
    };

    return (
        <header className="main-header">
            <div className="main-header__container container">
                <h1 className="visually-hidden">YetiCave</h1>
                <Link className="main-header__logo" to="/">
                    <img src="/img/avatars/logo.svg" width="160" height="39" alt="Логотип компании YetiCave" />
                </Link>
                <form className="main-header__search" method="get" action="search.php" autoComplete="off">
                    <input type="search" className="search" placeholder="Поиск лота" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
                    <input className="main-header__search-btn" type="submit" name="find" value="Найти" />
                </form>
                {user &&
                    <div><Link className="main-header__add-lot button" to="/add">Добавить лот</Link></div>}

                <nav className="user-menu">
                    {user && (
                        <>
                            <div className="user-menu__image">
                                <img src={user.avatar || 'img/avatars/avatar.jpg'} width="40" height="40" alt="Аватар" />
                            </div>
                            <div className="user-menu__logged">
                                <p>{user.name || 'Неизвестный'}</p>
                                <p><Link to="/" onClick={handleLogout}>Выйти</Link></p>
                            </div>
                        </>)}

                    {!user &&
                        <ul className="user-menu__list">
                            <li className="user-menu__item">
                                <Link to="/signup">Регистрация</Link>
                            </li>
                            <li className="user-menu__item">
                                <Link to="/login">Вход</Link>
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header
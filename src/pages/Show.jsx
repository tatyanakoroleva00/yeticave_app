import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export const Show = ({ user }) => {
    const { id } = useParams();
    const [lot, setLot] = useState({
        lotName: '',
        category: '',
        lotMessage: '',
        img_url: '',
        lotStep: '',
        lotDate: '',
        curPrice: '',
        userName: '',
        email: '',
        userId: '',
    });
    const [userLotRate, setUserLotRate] = useState(0);
    const [islotExpired, setIsLotExpired] = useState(false);
    const [errors, setErrors] = useState('');
    const [ratesNumber, setRatesNumber] = useState(0);
    const [rates, setRates] = useState([]);

    // Вывод лота
    useEffect(() => {
        axios.post('http://yeticave-second.loc/controllers/show_lot.php',
            { id })
            .then(response => {
                const data = response.data;
                setLot(prev => ({
                    ...prev,
                    lotName: data['lot_name'],
                    category: data['category_name'],
                    lotMessage: data['lot_message'],
                    img_url: data['img_url'],
                    lotStep: data['lot_step'],
                    lotDate: data['lot_date'],
                    curPrice: data['cur_price'],
                    userName: data.name,
                    userId: data['user_id'],
                    email: data.email,
                }));
                let result = getTheLotStatus(data['lot_date']);

                if(result > 0 || result == 0) setIsLotExpired(true);
                if(result < 0) setIsLotExpired(false);
            }
            );
    }, []);

    //Вывод количества ставок
    useEffect(() => {
        axios.post('http://yeticave-second.loc/api/rates_number.php', {
            lot_id: id,
        })
        .then(response => {
            setRatesNumber(response.data);
        })
    }, []);

    // Вывод истории ставок
    useEffect(() => {
        axios.post('http://yeticave-second.loc/api/rates_history.php', {
            lot_id: id,
        })
        .then(response => {
            setRates(response.data);
        })
    }, []);

    function getTheLotStatus(value) {
        // Получаем сегодняшнюю дату
        const today = new Date();
        // Получаем дату из БД
        const dateFromDB =  value;
        // Преобразуем строку в объект Date
        const dbDate = new Date(dateFromDB);
        // Вычисляем разницу в миллисекундах
        const differenceInMilliseconds = today - dbDate;
        // Преобразуем миллисекунды в дни
        const millisecondsInADay = 1000 * 60 * 60 * 24;
        const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);
        return differenceInDays;
    }

    const sendUserLotRateHandler = (e) => {
        e.preventDefault();

        axios.post('http://yeticave-second.loc/controllers/make_a_bid.php', {
            lot_id: id, 
            user_rate: userLotRate,
            lot_step: lot.lotStep,
            cur_price: lot.curPrice,
        })
        .then(response => {
            if(!response.data.errors) {
                window.location.reload();
            } else {
                setErrors(response.data.errors.rate);
            }
        });
    };

    return (
        <section className="lot-item container">
            <h2>{lot.lotName}</h2>
            <div className="lot-item__content">
                {/* Left column */}
                <div className="lot-col left">
                    <div className="description">
                        <div className="lot-item__image">
                            <img src={lot['img_url']} width="730" height="548" alt={lot.lotName} />
                        </div>
                        <p className="lot-item__name"><b style={{ fontSize: '14px' }}>Наименование:&nbsp;</b> <span>{lot.lotName}</span>
                        </p>
                        <p className="lot-item__category"><b style={{ fontSize: '14px' }}>Категория:&nbsp;</b>
                            <span>{lot.category}</span></p>
                        <p className="lot-item__description"><b style={{ fontSize: '14px' }}>Описание:&nbsp;</b>
                            <span>{lot.lotMessage}</span></p>
                        <p><b style={{ fontSize: '14px' }}>Контакты:&nbsp;</b>
                            <span>{lot.userName}, email: {lot.email}</span></p>
                    </div>

                {(user && +user.id != lot.userId) && !islotExpired && 
                    <div>
                        <div className="lot-item__state">
                            <form className="lot-item__form" action='' method="post" onSubmit={sendUserLotRateHandler}>
                                <div>
                                    <p className="rates__title">Добавить ставку</p>
                                    <p className="lot-item__form-item form__item form__item--invalid">
                                        <label htmlFor="cost">Ваша cумма:</label>
                                        <input id="cost" type="text" name="lot_rate" placeholder="0"
                                            value={userLotRate} onChange={(e) => setUserLotRate(e.target.value)} />
                                    </p>
                                    <p style={{color: "red"}}>{errors}</p>
                                </div>
                                <div>
                                    <button type="submit" className="button">Разместить ставку</button>
                                    <div className="lot-item__min-cost">
                                        Мин. шаг <span>{lot.lotStep}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>}
                </div>
               {/* Right column */}
        <div className="lot-col">
            <h3>Информация торгов</h3>
            {user && 
                <h4><b>
                    <Link to="/mybets">Мои ставки тут</Link>
                </b></h4>}
            <h4>Торги</h4>
            <div>
                <span className="lot-item__timer timer">{lot.lotDate}</span>
                <div className="lot-item__cost-state">
                    <div className="lot-item__rate">
                        <span className="lot-item__amount">Текущая цена</span>
                        <span className="lot-item__cost">{lot.curPrice}<b className="rub">р</b></span>
                    </div>
                </div>
            </div>

            <p>{`Общее количество ставок: ${ratesNumber}`}</p>

            <h4>История торгов (<span>10</span>):</h4>
            <table className="history__list">
                {rates && rates.map((elem, index) => (
                    islotExpired && index == 0 ? (
                        <tr key={index} className='history__item winner'>
                            <td >{elem.price}</td>
                            <td >{elem['users_name']}</td>
                            <td>{elem['rate_date']}</td>
                            <td>Победитель!</td>
                    </tr>)
                : 
                        (
                        <tr key={index} className='history__item'>
                            <td >{elem.price}</td>
                            <td>{elem['users_name']}</td>
                            <td>{elem['rate_date']}</td>
                            <td></td>
                    </tr>
                        ) 
                ))}
                </table>
        </div>
            </div>
        </section>


    )
}

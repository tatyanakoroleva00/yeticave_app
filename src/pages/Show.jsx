import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Show = ({ user }) => {
    const { id } = useParams();
    const [lot, setLot] = useState({

        lotName: '',
        category: '',
        lotMessage: '',
        lotImage: '',
        lotStep: '',
        lotDate: '',
        curPrice: '',
        userName: '',
        email: '',
    });
    const [userLotRate, setUserLotRate] = useState(0);
    const [lotExpired, setLotExpired] = useState(false);

    useEffect(() => {
        axios.post('http://yeticave-second.loc/show_lot2.php',
            { id })
            .then(response => {
                const data = response.data;
                console.log(data);
                setLot(prev => ({
                    ...prev,
                    lotName: data['lot_name'],
                    category: data['category_name'],
                    lotMessage: data['lot_message'],
                    lotImage: data['img_url'],
                    lotStep: data['lot_step'],
                    lotDate: data['lot_date'],
                    curPrice: data['cur_price'],
                    userName: data.name,
                    email: data.email,
                }));
                getTheLotStatus(data['lot_date']);
            }
            );
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
        console.log(differenceInDays);
        // setLotStatus(differenceInDays);

        if(differenceInDays > 0 || differenceInDays == 0) setLotExpired(true);
        else setLotExpired(false);
    }

    const sendUserLotRateHandler = (e) => {
        e.preventDefault();

        axios.post('http://yeticave-second.loc/make_a_bid.php', {
            id, userLotRate
        })
        .then(response => console.log(response.data));
    };


    return (
        <section className="lot-item container">
            <h2>{lot.lotName}</h2>
            <div className="lot-item__content">
                {/* Left column */}
                <div className="lot-col left">
                    <div className="description">
                        <div className="lot-item__image">
                            <img src={lot.lotImage} width="730" height="548" alt={lot.lotName} />
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



                    {/* <?php if (isset($_SESSION['user']) && (strtotime($lot_date) > strtotime(date('Y-m-d')))) : ?> */}
                    {/* <?php */}
                    {/* # Если не текущий пользователь создал лот и дата истечения срока лота больше текущей */}
                {/* if ($user_id != $_SESSION['user']['id']) :?> */}
                {!lotExpired && 
                    <div>
                        <div class="lot-item__state">
                            <form class="lot-item__form" action='' method="post" onSubmit={sendUserLotRateHandler}>
                                <div>
                                    <p class="rates__title">Добавить ставку</p>
                                    <p class="lot-item__form-item form__item form__item--invalid">
                                        <label for="cost">Ваша cумма:</label>
                                        <input id="cost" type="text" name="lot_rate" placeholder="0"
                                            value={userLotRate} onChange={(e) => setUserLotRate(e.target.value)} />
                                    </p>
                                    {/* <p style="color:red;"><?= $errors; ?></p> */}
                                </div>
                                <div>
                                    <button type="submit" class="button">Разместить ставку</button>
                                    <div class="lot-item__min-cost">
                                        Мин. шаг <span>{lot.lotStep}</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>}
                    {/* <?php endif; ?> */}
                    {/* <?php endif; ?> */}
                </div>
            </div>
        </section>


    )
}

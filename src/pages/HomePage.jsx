import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Lot from "./Lot";
const HomePage = ({ user }) => {
    const [categories, setCategories] = useState(null);
    const [lotsStatus, setLotsStatus] = useState('Открытые');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [lots, setLots] = useState([]);
    const [show, setShow] = useState('new');
    const [message, setMessage] = useState([]);
    const [auctionFinishOrder, setAuctionFinishOrder] = useState('asc');
    const [publicationOrder, setPublicationOrder] = useState('asc');

    // Determine the next order
    const nextAuctionFinishOrder = auctionFinishOrder === 'asc' ? 'desc' : 'asc';
    const nextPublicationOrder = publicationOrder === 'asc' ? 'desc' : 'asc';
    const classNameAuction = `sort-button ${nextAuctionFinishOrder}`;
    const classNamePublication = `sort-button ${nextPublicationOrder}`;

    // All Categories request
    useEffect(() => {
        axios.get('/api/categories.php')
            .then(({ data }) => setCategories(data.flat()))
    }, []);

    // Show "new lots" when page is loaded for the first time
    useEffect(() => {
        axios.post('/api/new_lots.php', {
            'show': 'new',
            'order': auctionFinishOrder,
        })
            .then(response => {
                let requestedLots = rangeLots(response.data);
                setLots(requestedLots);
            })
    }, [])

    // Переключение между "открытыми" и "закрытыми" лотами
    const handleOpenClick = async (e, option) => {
        e.preventDefault();
        setShow(option);
        await axios.post('/api/new_lots.php', {
            'show': option,
            'order': auctionFinishOrder,
        })
            .then(response => {
                let requestedLots = rangeLots(response.data);
                setLots(requestedLots);
            })
    };

    // Переключение между лотами по дате истечения срока лота
    const handleButtonClickAuctionDate = async (e, option) => {
        e.preventDefault();
        setAuctionFinishOrder(nextAuctionFinishOrder);
        await axios.post('/api/new_lots.php', {
            'show': option,
            'order': nextAuctionFinishOrder,
        })
            .then(response => {
                let requestedLots = rangeLots(response.data);
                setLots(requestedLots);
            })
    };

    const handleButtonClickPublicationDate = async (e, option) => {
        e.preventDefault();
        setPublicationOrder(nextPublicationOrder);
        await axios.post('/api/new_lots.php', {
            'show': option,
            'publicationOrder': nextPublicationOrder,
        })
            .then(response => {
                let requestedLots = rangeLots(response.data);
                setLots(requestedLots);
            })
    };

    const handleFilteringByPrice = async(e) => {
        e.preventDefault();
        await axios.post('/api/new_lots.php', {
            'min_price' : minPrice, 
            'max_price': maxPrice, 
            'show' : show,
        })
        .then(response => {
            let requestedLots = response.data;
            if(requestedLots.length === 0) {
                setMessage('Nothing is found');
                setLots([]);

            } else {
                requestedLots = rangeLots(requestedLots);
                setLots(requestedLots);
            }
        })
    };

    // Function - ranging received from the server date - adding keys to values
    function rangeLots(incomeData) {
        return incomeData.map((data) => ({
            id: data[0],
            name: data[1],
            lot_message: data[2],
            img_url: data[3],
            lot_rate: data[4],
            lot_data: data[5],
            lot_step: data[6],
            price: data[7],
            cur_price: data[8],
            category_id: data[9],
            user_id: data[10],
            created_at: data[11]
        }));
    }
    // Refresh prices on reset button 
    const handleReset = () => {
        setMinPrice(0);
        setMaxPrice(0);
    };

    // Button clicks
    const clickHandler = () => {
        window.location.href = '/history';
    };


    return (
        <section className="promo">
            <h2 className="promo__title">Нужен стафф для катки?</h2>
            <p className="promo__text">На нашем интернет-аукционе ты найдёшь самое эксклюзивное сноубордическое и
                горнолыжное снаряжение.</p>
            <ul className="promo__list">
                {categories && categories.map((elem, index) => (
                    <li key={index} className="promo__item promo__item--boards">
                        <Link className="promo__link" to={elem}>{elem}</Link>
                    </li>
                ))}
            </ul>
            <br />
            <div>
                {user && <button onClick={clickHandler}>Просмотренные лоты</button>}
                <button onClick={(e) => { handleOpenClick(e, 'new'); setLotsStatus('Открытые') }}>Открытые лоты</button>
                <button onClick={(e) => { handleOpenClick(e, 'old'); setLotsStatus('Закрытые') }}>Закрытые лоты</button>
            </div>
            <div>
                <button onClick={(e) => handleButtonClickAuctionDate(e, show)} className={classNameAuction}>
                    Окончание аукциона {auctionFinishOrder === 'desc' ? "с начала" : "с конца"}
                    <span className={auctionFinishOrder}></span>
                </button>
                <button onClick={(e) => handleButtonClickPublicationDate(e, show)} className={classNamePublication}>
                    Дата публикации - {publicationOrder === 'desc' ? "по возрастанию" : "по убыванию"}
                    <span className={publicationOrder}></span>
                </button>
            </div>
            <hr />
            <h1>Фильтр лотов по цене</h1>
            <form action="/" method="post" onSubmit={handleFilteringByPrice}>
                <label htmlFor="min_price">Минимальная цена:</label>
                <input type="number" id="min_price" name="min_price" step="0.01" min="0" required value={minPrice} onChange={(e) => { setMinPrice(e.target.value) }} />

                <label htmlFor="max_price">Максимальная цена:</label>
                <input type="number" id="max_price" name="max_price" step="0.01" min="0" required value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }} />

                <input type="submit" value="Фильтровать" />
            </form>
            <button onClick={handleReset}>Сбросить</button>

            <section className="lots">
                <div className="lots__header">
                    <h2>{lotsStatus}</h2>
                </div>
                {lots.length === 0 && <b>{message}</b>}
                <Lot lots={lots} />
            </section>
        </section >
    )
}

export default HomePage
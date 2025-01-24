import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const HomePage = ({ user }) => {
    const [categories, setCategories] = useState(null);
    const [auctionFinishOrder, setAuctionFinishOrder] = useState('asc');
    const [publicationOrder, setPublicationOrder] = useState('asc');
    const [lotsStatus, setLotsStatus] = useState('Открытые');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [lots, setLots] = useState([]);

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

    // Button clicks
    const clickHandler = () => {
        window.location.href = '/history';
    };
    const handleButtonClickAuctionDate = () => {
        setAuctionFinishOrder(nextAuctionFinishOrder);
    };
    const handleButtonClickPublicationDate = () => {
        setPublicationOrder(nextPublicationOrder);
    };
    function rangeLots (incomeData) {
        return incomeData.map((data) => ({
            id: data[0],
            name: data[1], 
            lot_message : data[2], 
            img_url: data[3],
            lot_rate: data[4], 
            lot_data: data[5], 
            lot_step: data[6], 
            price: data[7], 
            cur_price: data[8], 
            category_id: data[9], 
            user_id: data[10], 
            created_at: data[11]}));
    }
    const handleOpenClick = () => {
        setLotsStatus('Открытые');
        axios.get('/api/new_lots.php')
        .then(response => {
        let requestedLots = rangeLots(response.data);
            setLots(requestedLots);
        })
    };

    const handleCloseClick = () => {
        setLotsStatus('Закрытые');
    };
    // Refresh prices
    const handleRefreshPage = () => {
        setMinPrice(0);
        setMaxPrice(0);
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
                <button onClick={handleOpenClick}>Открытые лоты</button>
                <button onClick={handleCloseClick}>Закрытые лоты</button>
            </div>
            <div>
                <button onClick={handleButtonClickAuctionDate} className={classNameAuction} onclick="window.location.href='?order=<?= $nextOrder ?>'">
                    Окончание аукциона {auctionFinishOrder === 'desc' ? "с начала" : "с конца"}
                    <span className={auctionFinishOrder}></span>
                </button>
                <button onClick={handleButtonClickPublicationDate} className={classNamePublication} onclick="window.location.href='?publicationOrder=<?= $nextPublicationOrder ?>'">
                    Дата публикации - {publicationOrder === 'desc' ? "по возрастанию" : "по убыванию"}
                    <span className={publicationOrder}></span>
                </button>
            </div>
            <hr />
            <h1>Фильтр лотов по цене</h1>
            <form action="index.php" method="get">
                <label for="min_price">Минимальная цена:</label>
                <input type="number" id="min_price" name="min_price" step="0.01" min="0" required value={minPrice} onChange={(e) => { setMinPrice(e.target.value) }} />

                <label for="max_price">Максимальная цена:</label>
                <input type="number" id="max_price" name="max_price" step="0.01" min="0" required value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }} />

                <input type="submit" value="Фильтровать" />
            </form>
            <button onClick={handleRefreshPage}>Сбросить</button>


            <section className="lots">
                <div className="lots__header">
                    <h2>{lotsStatus}</h2>
                </div>

                {/* {/* <?php if(isset($search_array)) :?> */}
                <ul className="lots__list">
                    {lots && lots.map((lot, index) => (
                        <li key={index} className="lots__item lot">
                            <div className="lot__image">
                                <img src={lot['img_url']} width="350" height="260" alt={lot.name} />
                            </div>
                            <div className="lot__info">
                                <span className="lot__category">{lot['category_name']}</span>
                                <h3 className="lot__title"><Link className="text-link" to=''>{lot.name}</Link></h3>
                                <p>Описание: {lot.message}</p>
                                <div className="lot__state">
                                    <div className="lot__rate">
                                        <span className="lot__amount">Стартовая цена</span>
                                        <span className="lot__cost">{lot['cur_price']}<b className="rub">р</b></span>
                                    </div>
                                    <div className="lot__timer timer">{/* <?php echo formattedDate($elem['lot_date']);?> */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </section >
    )
}

export default HomePage
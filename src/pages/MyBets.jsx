import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyBets = () => {

  const [bets, setBets] = useState([]);

  useEffect(() => {
    axios.get('my_bets2.php')
      .then(response => {
        let data = response.data;
        setBets(data['my_bets']);
      })
  }, []);

  console.log(bets);

  return (
    <>
      <section className="rates container">
        <h2>Мои ставки {bets ? `(${bets.length})` : ''}</h2>
        <table className="rates__list">
          <thead>
            <tr className="rates__item">
              <td>Название лота</td>
              <td>Категория</td>
              <td>Дата истечения лота</td>
              <td>Последняя ставка</td>
              <td>Дата ставки</td>
            </tr>
          </thead>
          <tbody>
            {bets && bets.map((elem, index) => {
              let date = new Date();
              let curTime = date.getTime();
              let expirationDateString = bets[index]['lot_date'];
              let expirationDate = new Date(expirationDateString);
              expirationDate = expirationDate.getTime();
              let lastUserId = elem['last_bid_user_id'];

              if (expirationDate - curTime > 0) {
                return (
                  <tr key={index} className="rates__item">
                    <td className="rates__info">
                      <div className="rates__img">
                        <img src={bets[index]['img_url']} width="54" height="40" alt={elem['lot_name']} />
                      </div>
                      <div>
                        <h3 className="rates__title"><a href="show_lot.php?id=<?=$lot_id?>">{elem['lot_name']}</a></h3>
                        <p>{elem['lot_message']}</p>
                      </div>
                    </td>
                    <td className="rates__category">
                      {elem['category_name']}
                    </td>
                    <td className="rates__timer">
                      <div className="timer timer--finishing">{elem['lot_date']}</div>
                    </td>
                    <td className="rates__price">
                      <span>{elem['rate_price']}</span>
                    </td>
                    <td className="rates_time">
                      {elem['rate_date']}
                    </td>
                  </tr>
                )
              };

              if (expirationDate - curTime < 0 && lastUserId == elem['user_id']) {
                return (
                  <tr className="rates__item rates__item--win">
                    <td className="rates__info">
                      <div className="rates__img">
                        <img src={bets[index]['img_url']} width="54" height="40" alt={elem['lot_name']} />
                      </div>
                      <div>
                        <h3 className="rates__title"><a href="show_lot.php?id=<?=$lot_id?>">{elem['lot_name']}</a></h3>
                        <p>{elem['lot_message']}</p>
                      </div>
                    </td>
                    <td className="rates__category">
                      {elem['category_name']}
                    </td>
                    <td className="rates__timer">
                      <div className="timer timer--win">Ставка выиграла</div>
                    </td>
                    <td className="rates__price">
                      <span>{elem['rate_price']}</span>
                    </td>
                    <td className="rates_time">
                      {elem['rate_date']}
                    </td>
                  </tr>
                )
              }



            })}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default MyBets
import React from 'react';
import { Link } from 'react-router-dom';

const Lot = ({ lots }) => {
  return (
    <ul className="lots__list">
      {lots && lots.map((lot, index) => (
        <li key={index} className="lots__item lot">
          <div className="lot__image">
            <img src={lot['img_url']} width="350" height="260" alt={lot.name} />
          </div>
          <div className="lot__info">
            <span className="lot__category">{lot['category_name']}</span>
            <h3 className="lot__title"><Link className="text-link" to=''>{lot.name}</Link></h3>
            <p>Описание: {lot['lot_message']}</p>
            <div className="lot__state">
              <div className="lot__rate">
                <span className="lot__amount">Стартовая цена</span>
                <span className="lot__cost">{lot['cur_price']}<b className="rub">р</b></span>
              </div>
              <div className="lot__timer timer">{lot['lot_data']}{/* <?php echo formattedDate($elem['lot_date']);?> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Lot
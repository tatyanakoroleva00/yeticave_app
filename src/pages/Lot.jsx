import React from 'react';
import { Link } from 'react-router-dom';

const Lot = ({ lot, key}) => {
  return (
        <li key={key} className="lots__item lot">
          <div className="lot__image">
            <img src={lot['img_url']} width="350" height="260" alt={lot.name} />
          </div>
          <div className="lot__info">
            <span className="lot__category">{lot['category_name']}</span>
            <h3 className="lot__title"><Link className="text-link" to={`show/${lot['id']}`}>{lot.name}</Link></h3>
            <div className='lot__description'>
              Описание: {lot['lot_message'].length > 100 ? `${lot['lot_message'].slice(0, 100)}...` : lot['lot_message']}</div>
            <div className="lot__state">
              <div className="lot__rate">
                <span className="lot__amount">Текущая цена</span>
                <span className="lot__cost">{lot['cur_price']}<b className="rub">р</b></span>
              </div>
              <div className="lot__timer timer">{lot['lot_date']}{/* <?php echo formattedDate($elem['lot_date']);?> */}
              </div>
            </div>
            {lot['cur_price'] != lot.price && 
            (
            <div className="lot__rate">
                <span className="lot__amount">Стартовая цена</span>
                <span className="lot__cost">{lot.price}<b className="rub">р</b></span>
              </div>
              )}
          </div>
        </li>
  )
}

export default Lot
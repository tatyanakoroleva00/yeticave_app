import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Lot = ({ lot, index, showThumbnail, scale}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
        <li key={lot+index} className="lots__item lot">
          <div width="350" height="260" className="lot__image" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <img  src={!isHovered && showThumbnail && lot['thumb_pic'] ? lot['thumb_pic'] : lot['img_url']} alt={lot.name}
            style={{cursor : isHovered ? 'pointer' : 'default', width: isHovered ? '400px' : '100%', height : isHovered ? '400px' : '100%', position: isHovered ? 'absolute' : 'relative', zIndex : isHovered ? '1000' : '0' }}
            />
          </div>
          <div className="lot__info">
            <span className="lot__category">{lot['category_name']}</span>
            <h3 className="lot__title"><Link className="text-link" to={`http://yeticave-second.loc/show/${lot['id']}`}>{lot.name}</Link></h3>
            <div className='lot__description'>
              Описание: {lot['lot_message'].length > 100 ? `${lot['lot_message'].slice(0, 100)}...` : lot['lot_message']}</div>
            <div className="lot__state">
              <div className="lot__rate">
                <span className="lot__amount">Текущая цена</span>
                <span className="lot__cost">{lot['cur_price']}<b className="rub">р</b></span>
              </div>
              <div className="lot__timer timer">{lot['lot_date']}
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
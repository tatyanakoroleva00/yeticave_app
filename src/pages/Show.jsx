import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
export const Show = () => {
    const {id} = useParams();
    const [lot, setLot] = useState({
        lotName: '',
        category: '',
        lotMessage: '',
        lotImage: '',
        lotStep: '',
        lotDate: '',
        curPrice: '',
    });

    useEffect(() => {
        axios.post('http://yeticave-second.loc/show_lot2.php', 
        {id})
        .then(response => {
            const data = response.data;
            setLot(prev => ({...prev,
                lotName : data['lot_name'],
                category: data['category_name'], 
                lotMessage: data['lot_message'],
                lotImage: data['img_url'],
                lotStep: data['lot_step'], 
                lotDate: data['lot_date'], 
                curPrice: data['cur_price']
            }));
            }
            );
    }, []);

    console.log(lot);

    return (
        <section className="lot-item container">
        <h2>{lot.lotName}</h2>
        <div className="lot-item__content">
        {/* Left column */}
        <div className="lot-col left">
            <div className="description">
                <div className="lot-item__image">
                    <img src={lot.lotImage} width="730" height="548" alt={lot.lotName}/>
                </div>
                <p className="lot-item__name"><b style={{ fontSize: '14px' }}>Наименование:</b> <span>{lot.lotName}</span>
                </p>
                <p className="lot-item__category"><b style={{ fontSize: '14px' }}>Категория:</b>
                    <span>{lot.category}</span></p>
                <p className="lot-item__description"><b style={{ fontSize: '14px' }}>Описание:</b>
                    <span>{lot.message}</span></p>
                <p><b style={{ fontSize: '14px' }}>Контакты:</b>
                    <span>{lot.userName}</span></p>
            </div>
        </div>
        </div>
       </section>


    )
}

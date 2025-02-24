import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Lot from './Lot';

const History = () => {
  const [lots, setLots] = useState([]);
  useEffect(() => {
    axios.get('api/history.php')
      .then(response => {
        // console.log(response.data); // Предполагаем, что ответ содержит данные в поле `data`
        setLots(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);
  return (
    <section className="lots">
      {lots && <h2>История просмотров</h2>}
      {lots.length == 0 && <h2>Нет просмотренных лотов</h2>}
      <ul className="lots__list">
      {lots && lots.map((elem, index) => (
        <Lot key={index} lot={elem} showThumbnail={true} />))}
        </ul>
    </section>
  )
}

export default History
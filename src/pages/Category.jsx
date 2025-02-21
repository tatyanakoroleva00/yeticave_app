import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lot from './Lot';
import axios from 'axios';

const Category = () => {
  const { category } = useParams();
  const [lots, setLots] = useState([]);


  useEffect(() => {
    axios.post(`/api/lots_by_categories.php`, { category })
      .then(response => {
        // console.log(response.data);
        setLots(response.data);
      })
      .catch(error => {
        console.error('Ошибка', error);
      });
  }, [category]);

  return (
    <div>
      <h1>{`Лоты в категории "${lots && lots.length > 0 ? lots[0]['name'] : ''}"`}</h1>
      <ul className="lots__list">
        {lots && lots.map((lot, index) => (
          <Lot key={index} lot={lot} index={index} />
        ))}
      </ul>
    </div>
  )
}

export default Category
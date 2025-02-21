import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lot from './Lot';
import axios from 'axios';

const Category = () => {
  const { category } = useParams();
  const [lots, setLots] = useState([]);

  useEffect(() => {
    axios.get(`api/lots_by_categories.php?category=${category}`)
      .then(response => {
        console.log(response);
        // setLots(response.data);
      })
      .catch(error => {
        console.error('Ошибка', error);
      });
  }, [category]);

  return (
    <div>
      <h1>Лоты в категории {category}</h1>
      <ul>
        {/* {lots.map((lot) => (
          <li key={lot.id}>{lot.id}</li>
        ))} */}
      </ul>


    </div>
  )
}

export default Category
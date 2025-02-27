import React, { useEffect } from 'react';
import Lot from './Lot';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Search = () => {

  const [lots, setLots] = useState([]);
  const [searchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) {
      setLots([]);
      setCurrentPage(1);
      setTotalPages(0);
      return;
    }
      axios.post('/search2.php', { query, currentPage })
        .then(response => {
          let data = response.data;
          if (data['search_array']) {
            setLots(data['search_array']);
          } else {
            setLots([]);
            setCurrentPage(1);
            setTotalPages(0);
          }
          if (data.totalPages) {
            setTotalPages(data.totalPages);
          }
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        })
    
  }, [query, currentPage]);

  console.log(lots);
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className="container">
      <section className="lots">
        {(lots.length == 0 || !query) && <h2>{query ? `Ничего не найдено по запросу ${query}` : 'Введите запрос'}</h2>}

        {lots.length > 0 && totalPages > 0 &&
          (
            <div>
              <h2>{`Результаты поиска по запросу ${query}`}</h2>

              <ul className="lots__list">
                {lots && lots.map((elem, index) => (
                  <Lot key={index} lot={elem} showThumbnail={true} />))}
              </ul>

            </div>)}

        {totalPages > 1 &&
          <div>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Назад</button>
            {[...Array(totalPages).keys()].map(pageNum => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum + 1)}
                disabled={currentPage === pageNum + 1}
              >
                {pageNum + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Вперед</button>

          </div>
        }
      </section >
    </div >

  )
}

export default Search
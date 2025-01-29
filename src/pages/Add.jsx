import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const Add = () => {
  const [lotName, setLotName] = useState('');
  const [category, setCategory] = useState('');
  const [lotMessage, setLotMessage] = useState('');
  const [lotImage, setLotImage] = useState('');
  const [lotStep, setLotStep] = useState('');
  const [lotDate, setLotDate] = useState('');
  const [curPrice, setCurPrice] = useState('');
  const [errors, setErrors] = useState([]);
  const [preview, setPreview] = useState('');

  //Сложные классы
  const formClass = `form form--add-lot container ${errors.length > 0 ? 'form--invalid' : ''}`;
  const lotNameClass = `form__item ${errors.lotName === '' ? 'form__item--invalid' : ''}`;
  const categoryClass = `form__item ${errors.category === '' ? 'form__item--invalid' : ''}`;
  const lotMessageClass = `form__item form__item--wide ${errors.lotMessage === '' ? 'form__item--invalid' : ''}`;
  const curPriceClass = `form__item form__item--small ${errors.curPrice === '' ? 'form__item--invalid' : ''}`;
  const lotStepClass = `form__item form__item--small ${errors.lotStep === '' ? 'form__item--invalid' : ''}`;
  const lotDateClass = `form__item ${errors.lotDate === '' ? 'form__item--invalid' : ''}`;

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLotImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log(lotImage);
  //Отправка данных формы
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // let formData = {
  //   //   lot_name: lotName,
  //   //   category: category,
  //   //   lot_message: lotMessage,
  //   //   img_url: lotImage,
  //   //   lot_step: lotStep,
  //   //   lot_date: lotDate,
  //   //   cur_price: curPrice,
  //   // };

  //  axios.post('http://yeticave-second.loc/add1.php', formData, {
  //   headers: {
  //     // Заголовок 'Content-Type' устанавливать не нужно, браузер сделает это автоматически,
  //     // добавив к нему границу (boundary)
  //     'Content-Type': 'multipart/form-data'
  //   }
  // })
  //     .then(response => {
  //       console.log(response.data);
  //       // const { errors, data } = response.data;
  //       // setErrors(errors);
  //       // console.log(data);
  //     })
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Создаем экземпляр FormData
    const formData = new FormData();
  
    // Добавляем данные формы
    formData.append('lot_name', lotName);
    formData.append('category', category);
    formData.append('lot_message', lotMessage);
  
    // Предполагаем, что lotImage является файлом, выбранным пользователем
    // Например, используя <input type="file" onChange={handleFileChange} />
    // где handleFileChange обновляет состояние lotImage
    if (lotImage) {
      formData.append('img_url', lotImage, lotImage.name);
    }
  
    formData.append('lot_step', lotStep);
    formData.append('lot_date', lotDate);
    formData.append('cur_price', curPrice);
  
    // Отправляем запрос
    axios.post('http://yeticave-second.loc/add1.php', formData, {
      headers: {
        // Заголовок 'Content-Type' устанавливать не нужно, браузер сделает это автоматически,
        // добавив к нему границу (boundary)
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.status === 200) {
        const {data} = response;
        // const { errors, data } = response.data;
        // setErrors(errors);
        console.log(data);
      } else {
        console.warn('Received response with status:', response.status);
      }
    })
    .catch(error => {
      console.error('Error during the request:', error);
      // Обработка ошибок отправки формы, например, показ сообщения пользователю
    });
  };


  const handleRemoveFile = (e) => {
    e.preventDefault;
    setLotImage(null);
    setPreview(null);
  };


  console.log(errors);
  console.log(lotImage);
  return (
    <>
      <form onSubmit={handleSubmit} className={formClass} action="/add.php" method="post">
        <span className="form__error form__error--bottom">{errors.length > 0 ? 'Пожалуйста, исправьте ошибки в форме.' : ''}</span>
        <h2>Добавление лота</h2>
        <div className="form__container-two">
          {/* Наименование лота */}
          <div className={lotNameClass}>
            <label htmlFor="lot-name">Наименование <sup>*</sup></label>
            <input id="lot-name" type="text" name="lot_name" value={lotName} onChange={(e) => setLotName(e.target.value)} placeholder="Введите наименование лота" />
            <span className="form__error">{errors['lot_name'] ? 'Введите наименование лота' : ''}</span>
          </div>
          {/* Категории */}
          <div className={categoryClass}>
            <label htmlFor="category">Категория <sup>*</sup></label>
            <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Выберите категорию</option>
              <option
                value="Доски и лыжи"> Доски и лыжи </option>
              <option value="Крепления">
                Крепления
              </option>
              <option value="Ботинки">Ботинки
              </option>
              <option value="Одежда">Одежда
              </option>
              <option value="Инструменты">Инструменты
              </option>
              <option value="Разное">
                Разное
              </option>
            </select>
            <span className="form__error">{errors.category ? 'Выберите категорию' : ''}</span>
          </div>
        </div>
        {/* Описание */}
        <div className={lotMessageClass}>
          <label htmlFor="message">Описание <sup>*</sup></label>
          <textarea id="message" name="lot_message" placeholder="Напишите описание лота" onChange={(e) => setLotMessage(e.target.value)}>{lotMessage}</textarea>
          <span className="form__error">{errors['lot_message'] ? 'Напишите описание лота' : ''}</span>
        </div>
        {/* Изображение */}
        <div>
          <label>Изображение <sup>*</sup></label>
          <div className="form__input-file">
            {preview && (
              <>
                <img src={preview} alt="Загруженное изображение" width="100px " />
                <button className="remove-button" onClick={handleRemoveFile}>УДАЛИТЬ</button>
              </>)}
            {!preview && <input type="file" onChange={handleFileChange} id="lot_img" name="image" />}
            <span className="form__error">{errors.img_url ?? ''}</span>
          </div>
        </div>
        <div className="form__container-three">
          {/* Начальная цена */}
          <div
            className={curPriceClass}>
            <label htmlFor="lot_rate">Начальная цена <sup>*</sup></label>
            <input id="lot_rate" type="number" min="1" step="1" value={curPrice} onChange={(e) => setCurPrice(e.target.value)} name="curPrice"
              placeholder="0" />
            <span
              className="form__error">{errors['cur_price'] ? 'Введите начальную цену' : ''}</span>
          </div>

          {/* Шаг ставки */}
          <div
            className={lotStepClass}>
            <label htmlFor="lot-step">Шаг ставки <sup>*</sup></label>
            <input id="lot-step" type="number" min="1" step="1" value={lotStep} onChange={(e) => setLotStep(e.target.value)} name="lot_step"
              placeholder="0" />
            <span className="form__error">{errors['lot_step'] ? 'Введите шаг ставки' : ''}</span>
          </div>

          {/* Дата окончания торгов */}
          <div className={lotDateClass}>
            <label htmlFor="lot-date">Дата окончания торгов <sup>*</sup></label>
            <input className="form__input-date" id="lot-date" value={lotDate} onChange={(e) => setLotDate(e.target.value)} type="date"
              name="lot_date" placeholder="Введите дату в формате ГГГГ-ММ-ДД" />
            <span
              className="form__error">{errors['lot_date'] ?? ''}</span>
          </div >
        </div >
        <button type="submit" className="button">Добавить лот</button>
      </form >
    </>
  )
}

export default Add
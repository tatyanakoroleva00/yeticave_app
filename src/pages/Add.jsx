import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [formValues, setFormValues] = useState({
    lotName: '',
    category: '',
    lotMessage: '',
    lotImage: '',
    lotStep: '',
    lotDate: '',
    curPrice: '',
  });
  const [preview, setPreview] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Используем хук useNavigate

  //Сложные классы
  const formClass = `form form--add-lot container ${Object.keys(errors).length > 0 ? 'form--invalid' : ''}`;
  const lotNameClass = `form__item ${errors.lot_name ? 'form__item--invalid' : ''}`;
  const categoryClass = `form__item ${errors.category ? 'form__item--invalid' : ''}`;
  const lotMessageClass = `form__item form__item--wide ${errors.lot_message ? 'form__item--invalid' : ''}`;
  const curPriceClass = `form__item form__item--small ${errors.cur_price ? 'form__item--invalid' : ''}`;
  const lotStepClass= `form__item form__item--small ${errors.lot_step ? 'form__item--invalid' : ''}`;
  const lotDateClass= `form__item ${errors.lot_date ? 'form__item--invalid' : ''}`;

  // Обновление данных формы
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormValues(prevFormValues => ({...prevFormValues, [name]: value}));
  };

  // Обработка выбора файла
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues(prev => ({...prev, lotImage : file}));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Отправляем данные формы на сервер
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Очищаем ошибки перед отправкой формы

    // Подстраиваем названия переменных React под названия переменных в PHP
    const formData = {
      lot_name: formValues.lotName,
      category: formValues.category,
      lot_message: formValues.lotMessage,
      img_url: formValues.lotImage,
      lot_step: formValues.lotStep,
      lot_date: formValues.lotDate,
      cur_price: formValues.curPrice,
    };

    // Отправляем данные
    try {
      let response = await axios.post('http://yeticave-second.loc/add.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
      const {errors, file, data, lotId} = response.data;
      console.log(response.data);
      if(errors) {
        // console.log(data);
        if(Object.keys(errors).length > 0) {
        setErrors(errors);
      } 
      } else {
        // console.log(lotId);
        navigate(`/show/${lotId}`);
      }
    } catch(error ) {
      // console.error('Error during the request:', error);
    };
  };

  const handleRemoveFile = (e) => {
    e.preventDefault;
    setFormValues(prev => ({...prev, lotImage : ''}));
    setPreview(null);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={formClass} action="/add.php" method="post">
        <span className="form__error form__error--bottom">{Object.keys(errors).length > 0 ? 'Пожалуйста, исправьте ошибки в форме.' : ''}</span>
        <h2>Добавление лота</h2>
        <div className="form__container-two">
          {/* Наименование лота */}
          <div className={lotNameClass}>
            <label htmlFor="lot-name">Наименование <sup>*</sup></label>
            <input id="lot-name" type="text" name="lotName" value={formValues.lotName} onChange={handleInputChange} placeholder="Введите наименование лота" />
            <span className="form__error">{errors['lot_name'] ? 'Введите наименование лота' : ''}</span>
          </div>
          {/* Категории */}
          <div className={categoryClass}>
            <label htmlFor="category">Категория <sup>*</sup></label>
            <select id="category" name="category" value={formValues.category} onChange={handleInputChange}>
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
            <span className="form__error">{errors.category ?? ''}</span>
          </div>
        </div>
        {/* Описание */}
        <div className={lotMessageClass}>
          <label htmlFor="message">Описание <sup>*</sup></label>
          <textarea id="message" name="lotMessage" placeholder="Напишите описание лота" onChange={handleInputChange}>{formValues.lotMessage}</textarea>
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
            {!preview && <input type="file" onChange={handleFileChange} id="lot_img" name="lotImage" />}
            <span className="form__error">{errors.img_url ?? ''}</span>
          </div>
        </div>
        <div className="form__container-three">
          {/* Начальная цена */}
          <div
            className={curPriceClass}>
            <label htmlFor="lot_rate">Начальная цена <sup>*</sup></label>
            <input id="lot_rate" type="number" min="1" step="1" value={formValues.curPrice} onChange={handleInputChange} name="curPrice"
              placeholder="0" />
            <span
              className="form__error">{errors['cur_price'] ? 'Введите начальную цену' : ''}</span>
          </div>

          {/* Шаг ставки */}
          <div
            className={lotStepClass}>
            <label htmlFor="lot-step">Шаг ставки <sup>*</sup></label>
            <input id="lot-step" type="number" min="1" step="1" value={formValues.lotStep} onChange={handleInputChange} name="lotStep"
              placeholder="0" />
            <span className="form__error">{errors['lot_step'] ? 'Введите шаг ставки' : ''}</span>
          </div>

          {/* Дата окончания торгов */}
          <div className={lotDateClass}>
            <label htmlFor="lot-date">Дата окончания торгов <sup>*</sup></label>
            <input className="form__input-date" id="lot-date" value={formValues.lotDate} onChange={handleInputChange} type="date"
              name="lotDate" placeholder="Введите дату в формате ГГГГ-ММ-ДД" />
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
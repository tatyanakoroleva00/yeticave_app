import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const HomePage = () => {
    const navigate = useNavigate();

    const navigateToAdd = () => {
        navigate('/add');
    }

    return (
        <div className="page-wrapper">
            <Header navigateToAdd={navigateToAdd} />
        </div>
    )
}

export default HomePage
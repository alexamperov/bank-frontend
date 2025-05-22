import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Добавим немного стилей

const NavigationPanel = ({ role = 'admin' }) => {
    const getMenuItems = () => {
        switch (role) {
            case 'user':
                return [
                    {
                        label: 'Мои Договоры',
                        to: '/credits',
                    },
                    {
                        label: 'Мои Заявки',
                        to: '/applications',
                    },
                    {
                        label: 'Подать заявку',
                        to: '/apply',
                    }
                ];
            case 'employee':
                return [
                    {
                        label: 'Активные кредиты',
                        to: '/credits',
                    },
                    {
                        label: 'Не рассмотренные заявки',
                        to: '/applications',
                    },
                ];
            case 'admin':
                return [
                    {
                        label: 'Список кредитов',
                        to: '/credits',
                    },
                    {
                        label: 'Список работников',
                        to: '/employees',
                    },
                ];
            default:
                return [];
        }
    };

    const items = getMenuItems();

    return (
        <nav className="navbar">
            {items.map(item => (
                <Link key={item.to} to={item.to} className="nav-link">
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default NavigationPanel;
import React, { useState } from 'react';
import { Button, Modal, Card, Typography } from 'antd';
import LoginForm from '../../forms/auth/AuthForm.jsx'; // Импортируем форму авторизации
import RegisterForm from '../../forms/auth/RegistrationForm.jsx'; // Импортируем форму регистрации (создадим ее ниже)

const { Title, Paragraph } = Typography;

const HomePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false); // Видимость модального окна
    const [isLoginMode, setIsLoginMode] = useState(true); // Режим: true - авторизация, false - регистрация

    // Открытие модального окна
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Закрытие модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLoginMode(true); // Возвращаемся в режим авторизации после закрытия
    };

    // Переключение между авторизацией и регистрацией
    const switchToRegister = () => {
        setIsLoginMode(false);
    };

    const switchToLogin = () => {
        setIsLoginMode(true);
    };

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Информация о МФО */}
            <Title level={2}>Добро пожаловать в МФО</Title>
            <p>
                Мы предоставляем быстрые и удобные микрозаймы для физических лиц. Оформите заявку онлайн и получите деньги за несколько минут.
            </p>

            {/* Кнопка для открытия модального окна */}
            <Button type="primary" onClick={showModal}>
                Регистрация / Авторизация
            </Button>

            {/* Модальное окно */}
            <Modal
                title={isLoginMode ? 'Авторизация' : 'Регистрация'}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Убираем футер модального окна
            >
                {isLoginMode ? (
                    <LoginForm
                        onLogin={(values) => alert(`Авторизация: ${JSON.stringify(values)}`)}
                        onSwitchToRegister={switchToRegister}
                    />
                ) : (
                    <RegisterForm
                        onRegister={(values) => alert(`Регистрация: ${JSON.stringify(values)}`)}
                        onSwitchToLogin={switchToLogin}
                    />
                )}
            </Modal>
        </div>
    );
};

export default HomePage;
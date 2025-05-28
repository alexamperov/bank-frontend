import React, { useState } from 'react';
import { Modal, Button, Input, Space } from 'antd';

const SalaryModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false); // Состояние видимости модального окна
    const [salary, setSalary] = useState(''); // Состояние для хранения значения зарплаты

    // Функция для открытия модального окна
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Функция для закрытия модального окна
    const handleCancel = () => {
        setIsModalVisible(false);
        setSalary(''); // Очищаем поле зарплаты при закрытии
    };

    // Функция для обработки выплаты зарплаты
    const handlePay = () => {
        if (!salary) {
            alert('Пожалуйста, введите сумму зарплаты.');
            return;
        }
        alert(`Зарплата в размере ${salary} успешно выплачена.`);
        setIsModalVisible(false);
        setSalary(''); // Очищаем поле после выплаты
    };

    return (
        <div style={{ padding: '24px', width: '300px', margin: '0 auto' }}>
            {/* Кнопка для открытия модального окна */}
            <Button type="primary" onClick={showModal}>
                Открыть модальное окно
            </Button>

            {/* Модальное окно */}
            <Modal
                title="Выплата зарплаты"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Назад
                    </Button>,
                    <Button key="pay" type="primary" onClick={handlePay}>
                        Выплатить
                    </Button>,
                ]}
            >
                <Space direction="vertical" style={{ width: '100%' }}>
                    <label style={{ fontWeight: 'bold' }}>Зарплата:</label>
                    <Input
                        placeholder="Введите сумму"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        type="number"
                        min="0"
                    />
                </Space>
            </Modal>
        </div>
    );
};

export default SalaryModal;
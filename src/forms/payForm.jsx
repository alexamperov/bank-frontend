// forms/payForm/PayForm.jsx
import React, { useState } from 'react';
import { Modal, Input, Button, Space } from 'antd';

const PayForm = ({ isVisible, onCancel, onPay, currency }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = () => {
        if (!amount) {
            return alert('Введите сумму!');
        }
        onPay(amount); // Передаем сумму в родительский компонент
        setAmount('');
    };

    return (
        <Modal
            title="Внесение платежа"
            open={isVisible}
            onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Назад
                </Button>,
                <Button key="pay" type="primary" onClick={handleSubmit}>
                    Выплатить
                </Button>,
            ]}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <label style={{ fontWeight: 'bold' }}>
                    Сумма платежа ({currency}): {/* Валюта отображается из пропсов */}
                </label>
                <Input
                    placeholder={`Введите сумму в ${currency}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    min="0"
                />
            </Space>
        </Modal>
    );
};

export default PayForm;
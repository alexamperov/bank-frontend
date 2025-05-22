// Форма:
//      Сумма
//      Дата возврата
//      Кнопка: Подать
//      Кнопка: Отмена
//      Хранить стейт

import React, { useState } from 'react';
import { Form, Input, DatePicker, Button, Card } from 'antd';

const CreditApplicationForm = ({ onSend, onCancel }) => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState({
        amount: '',
        returnDate: null,
        interestRate: '',
    });

    const handleSubmit = (values) => {
        onSend(values);
        form.resetFields();
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Card title={<p>Подать заявку</p>} style={{ width: '500px' }}>
            <Form form={form} layout="vertical" style={{ width: 400, margin: '0 auto', padding: '12px' }} onFinish={handleSubmit}>
                <Form.Item label="Сумма" name="amount" rules={[{ required: true, message: 'Укажите сумму!' }]}>
                    <Input
                        type="number"
                        placeholder="Введите сумму"
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </Form.Item>

                <Form.Item label="Желаемая процентная ставка" name="interestRate" rules={[{ required: true, message: 'Укажите процентную ставку!' }]}>
                    <Input
                        type="text"
                        placeholder="Введите процентную ставку (например, 12%)"
                        onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    />
                </Form.Item>

                <Form.Item label="Дата возврата" name="returnDate" rules={[{ required: true, message: 'Укажите дату!' }]}>
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder="Выберите дату"
                        onChange={(date) => setFormData({ ...formData, returnDate: date })}
                        onOk={(date) => setFormData({ ...formData, returnDate: date })}
                    />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                    <Button onClick={handleCancel}>Отмена</Button>
                    <Button type="primary" htmlType="submit">
                        Подать
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default CreditApplicationForm;

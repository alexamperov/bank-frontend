import React from 'react';
import { Form, Input, DatePicker, Button, Card } from 'antd';
import { createApplication } from "../../api.js";
import { useNavigate } from "react-router-dom";

const CreditApplicationForm = ({ onCancel }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            // Ремаппинг значений в формат API
            const applicationData = {
                sum: values.sum,
                percent: values.percent,
                returnAt: values.returnAt.format('YYYY-MM-DD'), // Форматируем дату
            };

            await createApplication(applicationData);
            form.resetFields();
            navigate('/applications');
        } catch (error) {
            console.error("Ошибка при создании заявки:", error);
        }
    };

    return (
        <Card title={<p>Подать заявку</p>} style={{ width: '500px', margin: "auto" }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ width: 400, margin: '0 auto', padding: '12px' }}
            >
                {/* Поле суммы */}
                <Form.Item
                    label="Сумма"
                    name="sum"
                    rules={[{ required: true, message: 'Укажите сумму!' }]}
                >
                    <Input type="number" placeholder="Введите сумму" />
                </Form.Item>

                {/* Поле процентной ставки */}
                <Form.Item
                    label="Желаемая процентная ставка"
                    name="percent"
                    rules={[{ required: true, message: 'Укажите процентную ставку!' }]}
                >
                    <Input
                        type="number"
                        placeholder="Введите процентную ставку (например, 12)"
                        addonAfter="%"
                    />
                </Form.Item>

                {/* Поле даты возврата */}
                <Form.Item
                    label="Дата возврата"
                    name="returnAt"
                    rules={[{ required: true, message: 'Укажите дату!' }]}
                >
                    <DatePicker
                        style={{ width: '100%' }}
                        placeholder="Выберите дату"
                        format="DD.MM.YYYY"
                    />
                </Form.Item>

                {/* Кнопки управления */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
                    <Button onClick={() => {
                        form.resetFields();
                        onCancel();
                    }}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Подать
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default CreditApplicationForm;
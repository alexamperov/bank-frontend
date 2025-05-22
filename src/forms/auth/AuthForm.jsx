import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';

const LoginForm = ({ onLogin, onSwitchToRegister }) => {
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        onLogin(values);
        form.resetFields();
    };

    return (
        <Card title={<p>Авторизация</p>} style={{ width: '500px' }}>
            <Form form={form} layout="vertical" style={{ width: 400, margin: '0 auto', padding: '12px' }} onFinish={handleSubmit}>
                <Form.Item label="Логин" name="login" rules={[{ required: true, message: 'Укажите логин!' }]}>
                    <Input placeholder="Введите логин" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Укажите пароль!' }]}>
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Button type="link" onClick={onSwitchToRegister}>
                        Нет аккаунта?
                    </Button>
                </div>
            </Form>
        </Card>
    );
};

export default LoginForm;
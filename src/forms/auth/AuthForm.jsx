import React, { useState } from 'react';
import {Form, Input, Button, Card, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {signIn} from "../../api.js";
const LoginForm = ({ onLogin, onSwitchToRegister }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        try {
            // Вызываем функцию signIn с данными формы
            const token = await signIn(values);

            // Если авторизация успешна, показываем уведомление
            message.success('Авторизация успешна!');

            // Сохраняем токен в localStorage (это уже делается внутри signIn)
            console.log('Токен сохранён:', token);

            // Очищаем поля формы
            form.resetFields();

            // Вызываем onLogin (если нужно передать данные выше)
            navigate('/credits')
            // Перенаправляем пользователя на другую страницу или выполняем другие действия
            // Например: window.location.href = '/dashboard';
        } catch (error) {
            // Если произошла ошибка, выводим сообщение об ошибке
            message.error('Ошибка при авторизации. Попробуйте снова.');
            console.error('Ошибка при авторизации:', error);
        }
    };

    return (

            <Form form={form} layout="vertical" style={{ width: 400, margin: '0 auto', padding: '12px' }} onFinish={handleSubmit}>
                <Form.Item label="Логин" name="email" rules={[{ required: true, message: 'Укажите логин!' }]}>
                    <Input placeholder="Введите логин" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Укажите пароль!' }]}>
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Войти
                    </Button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Button type="link" onClick={onSwitchToRegister}>
                        Нет аккаунта?
                    </Button>
                </div>
            </Form>

    );
};

export default LoginForm;
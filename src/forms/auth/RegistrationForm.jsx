import React, { useState } from 'react';
import {Form, Input, Button, Card, message} from 'antd';
import {signUp} from "../../api.js";
const RegistrationForm = ({ onRegister, onSwitchToLogin }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            // Вызываем функцию signUp с данными формы
            const response = await signUp(values);
            console.log(values)
            // Если регистрация успешна, показываем уведомление и переключаемся на форму авторизации
            message.success(response.message); // Показываем сообщение "verification code sent"
            form.resetFields(); // Очищаем поля формы
            onSwitchToLogin(); // Переключаемся на форму авторизации
        } catch (error) {
            // Если произошла ошибка, выводим сообщение об ошибке
            message.error('Ошибка при регистрации. Попробуйте снова.');
            console.error('Ошибка при регистрации:', error);
        }
    };

    return (
            <Form form={form} layout="vertical" style={{ width: 400, margin: '0 auto', padding: '12px' }} onFinish={handleSubmit}>
                <Form.Item label="Название" name="username" rules={[{ required: true, message: 'Укажите название!' }]}>
                    <Input placeholder="Введите название" />
                </Form.Item>

                <Form.Item label="Вид собственности" name="ownershipType" rules={[{ required: true, message: 'Укажите вид собственности!' }]}>
                    <Input placeholder="Введите вид собственности" />
                </Form.Item>

                <Form.Item label="Адрес" name="address" rules={[{ required: true, message: 'Укажите адрес!' }]}>
                    <Input placeholder="Введите адрес" />
                </Form.Item>

                <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: 'Укажите телефон!' }]}>
                    <Input placeholder="Введите телефон" />
                </Form.Item>

                <Form.Item label="Контактное лицо" name="contactPerson" rules={[{ required: true, message: 'Укажите контактное лицо!' }]}>
                    <Input placeholder="Введите контактное лицо" />
                </Form.Item>

                <Form.Item label="Почта" name="email" rules={[{ required: true, message: 'Укажите почту!', type: 'email' }]}>
                    <Input placeholder="Введите почту" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Укажите пароль!' }]}>
                    <Input.Password placeholder="Введите пароль" />
                </Form.Item>

                <Form.Item label="Повторение пароля" name="confirmPassword" rules={[
                    { required: true, message: 'Повторите пароль!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Пароли не совпадают!'));
                        },
                    }),
                ]}>
                    <Input.Password placeholder="Повторите пароль" />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                        Зарегистрироваться
                    </Button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Button type="link" onClick={onSwitchToLogin}>
                        Есть аккаунт?
                    </Button>
                </div>
            </Form>
    );
};

export default RegistrationForm;
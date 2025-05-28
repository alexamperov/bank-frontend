import axios from 'axios';

// Базовый URL
const BASE_URL = 'http://localhost:8080/api';

// Создание инстанса Axios
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерцептор для добавления токена из localStorage
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const signUp = async (userData) => {
    try {
        const response = await apiClient.post('/auth/sign-up', userData);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        throw error; // Передаем ошибку дальше, если нужно обработать её снаружи
    }
};

export const signIn = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/sign-in', credentials);
        const token = response.data.token;

        // Сохраняем токен в localStorage
        localStorage.setItem('authToken', token);

        console.log("Авторизация успешна. Токен сохранён.");
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при авторизации:", error);
        throw error; // Передаем ошибку дальше
    }
};

export const getMe = async () => {
    try {
        const response = await apiClient.get('/me');
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
        throw error; // Передаем ошибку дальше
    }
};


export const createApplication = async (applicationData) => {
    try {
        const response = await apiClient.post('/applications', applicationData);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при создании заявки:", error);
        throw error; // Передаем ошибку дальше
    }
};

export const getOwnApplications = async () => {
    try {
        const response = await apiClient.get('/applications');
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при получении списка заявок:", error);
        throw error; // Передаем ошибку дальше
    }
};
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

// APPLICATIONS

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

export const getAllApplications = async () => {
    try {
        const response = await apiClient.get('/applications_all');
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при получении списка заявок:", error);
        throw error; // Передаем ошибку дальше
    }
};

export const rejectApply = async (applyId) => {
    try {
        const response = await apiClient.post(`/applications/${applyId}/reject`)
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const approveApply = async (applyId) => {
    try {
        const response = await apiClient.post(`/applications/${applyId}/approve`)
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

// DEALS
export // Получение списка сделок
const getDeals = async () => {
    try {
        const response = await apiClient.get('/deals');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};

// Получить список работников
export const getEmployees = async () => {
    const res = await apiClient.get('/employees');
    return res.data;
};


export // Получение списка сделок
const getDealsByEmployeeID = async () => {
    try {
        const response = await apiClient.get('/deals_employee');
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};
export // Получение списка сделок
const getDealsOfEmployee = async (employeeId) => {
    try {
        const response = await apiClient.get(`/deals_employee?employee_id=${employeeId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};

export // Получение списка сделок
const getDealsOfUser = async (userID) => {
    try {
        const response = await apiClient.get(`/deals?user_id=${userID}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};
export // Получение списка сделок
const getDealByID = async (dealId) => {
    try {
        const response = await apiClient.get(`/deals/${dealId}`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};

export // Получение списка сделок
const getAllDeals = async (dealId) => {
    try {
        const response = await apiClient.get(`/deals_all`);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении списка сделок:", error);
        throw error;
    }
};

export const getPayments = async (dealId) => {
    try {
        const response = await apiClient.get(`/deals/${dealId}/payments`);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при получении платежей:", error);
        throw error; // Передаем ошибку дальше
    }
};

export const getDelays = async (dealId) => {
    try {
        const response = await apiClient.get(`/deals/${dealId}/delays`);
        return response.data; // Возвращаем данные ответа
    } catch (error) {
        console.error("Ошибка при получении просрочек:", error);
        throw error; // Передаем ошибку дальше
    }
};

export const createPayment = async (dealId, paymentData) => {
    try {
        const response = await apiClient.post(`/deals/${dealId}/payments`,{amount: paymentData, method: 'card'});
        return response.data;
    } catch (error) {
        console.error("Ошибка при создании платежа:", error);
        throw error;
    }
};
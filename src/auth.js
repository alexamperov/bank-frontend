//auth.js

/**
 * Парсит JWT и возвращает payload.
 * @param {string} token - JWT токен.
 * @returns {Object|null} - Объект с данными payload или null, если токен некорректный.
 */
export const parseJwt = (token) => {
    try {
        // Разделяем токен на три части: header, payload, signature
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Некорректный формат JWT');
        }

        // Берем среднюю часть (payload)
        const base64Url = parts[1];

        // Декодируем Base64
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
                .join('')
        );

        // Парсим JSON и возвращаем объект
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Ошибка при парсинге JWT:', error.message);
        return null; // Возвращаем null, если что-то пошло не так
    }
};
import api from './api';

export const login = async (credentials) => {
    try {
        const response = await api.post('/login/', credentials);
        return response.data;
    } catch (error) {
        throw error;
    }
}
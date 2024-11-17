import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Base da sua API

export async function login(credentials) {
  try {
    const response = await axios.post(`${API_URL}/login/`, credentials);
    return response; // Retorna a resposta completa, incluindo data, status, etc.
  } catch (error) {
    // Lança um erro com uma mensagem amigável se a API retornar erro
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciais inválidas ou conta inativa.');
    }
    throw new Error('Erro ao tentar fazer login. Por favor, tente novamente.');
  }
}

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const AUTH_MESSAGES = {
  LOGIN: {
    SUCCESS: 'Connexion réussie',
    ERROR: 'Email ou mot de passe invalide',
    SERVER_ERROR: 'Erreur de connexion au serveur'
  },
  REGISTER: {
    SUCCESS: 'Inscription réussie',
    EMAIL_EXISTS: 'Cet email est déjà utilisé',
    ERROR: 'Erreur lors de l\'inscription',
    SERVER_ERROR: 'Erreur de connexion au serveur'
  }
};

const authService = {
  login: async (userEmail, userPassword) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        userEmail,
        userPassword
      }, { withCredentials: true });

      return {
        success: true,
        message: response.data.message || AUTH_MESSAGES.LOGIN.SUCCESS
      };
    } catch (error) {
      if (error.response?.status === 401) {
        return {
          success: false,
          message: AUTH_MESSAGES.LOGIN.ERROR
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || AUTH_MESSAGES.LOGIN.SERVER_ERROR
      };
    }
  },

  register: async (userName, userEmail, userPassword) => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        userName,
        userEmail,
        userPassword
      }, { withCredentials: true });

      return {
        success: true,
        message: response.data.message || AUTH_MESSAGES.REGISTER.SUCCESS
      };
    } catch (error) {
      if (error.response?.data?.errors?.userEmail) {
        return {
          success: false,
          message: AUTH_MESSAGES.REGISTER.EMAIL_EXISTS
        };
      }
      return {
        success: false,
        message: error.response?.data?.message || AUTH_MESSAGES.REGISTER.SERVER_ERROR
      };
    }
  },
  logout: async () => {
    const response = await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    return response.data;
  },

  checkAuth: async () => {
    const response = await axios.get(`${API_URL}/check-auth`, { withCredentials: true });
    return response.data;
  }
};

export default authService;
// API Service for communicating with backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://salesiq-app.onrender.com/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  // Add auth token if available
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      // If unauthorized, clear token and redirect to login
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: (email, password) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  register: (userData) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  logout: () =>
    apiCall('/auth/logout', {
      method: 'POST'
    }),

  getCurrentUser: () =>
    apiCall('/auth/me', {
      method: 'GET'
    }),

  refreshToken: () =>
    apiCall('/auth/refresh-token', {
      method: 'POST'
    })
};

// Users API
export const usersAPI = {
  getAll: () =>
    apiCall('/users', { method: 'GET' }),

  getById: (id) =>
    apiCall(`/users/${id}`, { method: 'GET' }),

  update: (id, userData) =>
    apiCall(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    }),

  delete: (id) =>
    apiCall(`/users/${id}`, { method: 'DELETE' }),

  getOnlineUsers: () =>
    apiCall('/users/status/online', { method: 'GET' }),

  updateStatus: (id, status) =>
    apiCall(`/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(status)
    })
};

// Chats API
export const chatsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/chats?${params}`, { method: 'GET' });
  },

  getById: (id) =>
    apiCall(`/chats/${id}`, { method: 'GET' }),

  create: (chatData) =>
    apiCall('/chats', {
      method: 'POST',
      body: JSON.stringify(chatData)
    }),

  update: (id, chatData) =>
    apiCall(`/chats/${id}`, {
      method: 'PUT',
      body: JSON.stringify(chatData)
    }),

  assign: (id, agentId) =>
    apiCall(`/chats/${id}/assign`, {
      method: 'POST',
      body: JSON.stringify({ agentId })
    }),

  close: (id, feedback = {}) =>
    apiCall(`/chats/${id}/close`, {
      method: 'POST',
      body: JSON.stringify(feedback)
    }),

  getByAgent: (agentId) =>
    apiCall(`/chats/agent/${agentId}`, { method: 'GET' })
};

// Visitors API
export const visitorsAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/visitors?${params}`, { method: 'GET' });
  },

  getById: (id) =>
    apiCall(`/visitors/${id}`, { method: 'GET' }),

  create: (visitorData) =>
    apiCall('/visitors', {
      method: 'POST',
      body: JSON.stringify(visitorData)
    }),

  update: (id, visitorData) =>
    apiCall(`/visitors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(visitorData)
    }),

  track: (id, trackingData) =>
    apiCall(`/visitors/${id}/track`, {
      method: 'POST',
      body: JSON.stringify(trackingData)
    }),

  getActive: () =>
    apiCall('/visitors/active/now', { method: 'GET' })
};

// Conversations API
export const conversationsAPI = {
  getMessages: (chatId) =>
    apiCall(`/conversations/${chatId}`, { method: 'GET' }),

  sendMessage: (chatId, messageData) =>
    apiCall(`/conversations/${chatId}/message`, {
      method: 'POST',
      body: JSON.stringify(messageData)
    }),

  sendVisitorMessage: (chatId, messageData) =>
    apiCall(`/conversations/${chatId}/visitor-message`, {
      method: 'POST',
      body: JSON.stringify(messageData)
    }),

  markAsRead: (messageId) =>
    apiCall(`/conversations/${messageId}/read`, {
      method: 'PUT'
    }),

  markAllAsRead: (chatId) =>
    apiCall(`/conversations/${chatId}/read-all`, {
      method: 'PUT'
    }),

  deleteMessage: (messageId) =>
    apiCall(`/conversations/${messageId}`, {
      method: 'DELETE'
    })
};

// Settings API
export const settingsAPI = {
  get: () =>
    apiCall('/settings', { method: 'GET' }),

  update: (settingsData) =>
    apiCall('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    }),

  updateNotifications: (notificationSettings) =>
    apiCall('/settings/notifications', {
      method: 'PUT',
      body: JSON.stringify(notificationSettings)
    }),

  updateAppearance: (appearanceSettings) =>
    apiCall('/settings/appearance', {
      method: 'PUT',
      body: JSON.stringify(appearanceSettings)
    })
};

export default {
  authAPI,
  usersAPI,
  chatsAPI,
  visitorsAPI,
  conversationsAPI,
  settingsAPI
};

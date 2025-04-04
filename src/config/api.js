const API_BASE_URL = 'https://n8n.jom.lol/webhook';

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/sean-rag`,
  CONVERSATION_LOG: `${API_BASE_URL}/update-conversation`
};

export const callApi = async (endpoint, data) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const apiService = {
  chat: async (chatInput, userEmail) => {
    return callApi(API_ENDPOINTS.CHAT, {
      chatInput,
      userEmail
    });
  },

  logConversation: async (data) => {
    return callApi(API_ENDPOINTS.CONVERSATION_LOG, {
      // user: data.email?.split('@')[0] || '',
      user: data.userMessage,
      email: data.email || '',
      ai: data.message || '',
      sessionid: data.sessionId
    });
  }
};

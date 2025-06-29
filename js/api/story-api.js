const StoryAPI = {
  _BASE_URL: 'https://story-api.dicoding.dev/v1',

  _getAuthToken() {
    return localStorage.getItem('authToken');
  },

  async register(name, email, password) {
    const response = await fetch(`${this._BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  },

  async login(email, password) {
    const response = await fetch(`${this._BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    localStorage.setItem('authToken', responseJson.loginResult.token);
    return responseJson;
  },

  async getAllStories() {
    const response = await fetch(`${this._BASE_URL}/stories?location=1`, {
      headers: { 'Authorization': `Bearer ${this._getAuthToken()}` },
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson.listStory;
  },

  async addNewStory(formData) {
    const response = await fetch(`${this._BASE_URL}/stories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this._getAuthToken()}`,
      },
      body: formData,
    });
    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  },

  // --- FUNGSI SUBSCRIBE NOTIFICATION YANG DIPERBAIKI ---
  async subscribeNotification(subscription) {
    // Objek 'subscription' sudah dalam format yang benar dari notification-helper.js
    // Kita tidak perlu memanggil .toJSON() lagi.
    // Langsung ekstrak p256dh dan auth dari 'keys'.
    const { p256dh, auth } = subscription.keys;

    const response = await fetch(`${this._BASE_URL}/notifications/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getAuthToken()}`,
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
        keys: { p256dh, auth },
      }),
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  },

  async unsubscribeNotification(subscription) {
    const response = await fetch(`${this._BASE_URL}/notifications/subscribe`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getAuthToken()}`,
      },
      body: JSON.stringify({
        endpoint: subscription.endpoint,
      }),
    });

    const responseJson = await response.json();
    if (responseJson.error) {
      throw new Error(responseJson.message);
    }
    return responseJson;
  },
};

export default StoryAPI;

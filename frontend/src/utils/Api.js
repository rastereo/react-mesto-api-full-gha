class Api {
  constructor({ baseUrl, token }) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }

    return res.json();
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include'
    })
      .then(this._getResponseData);
  }

  patchUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
      .then(this._getResponseData);
  }

  patchAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar: avatar })
    })
      .then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  postCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(this._getResponseData);
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
      })
        .then(this._getResponseData);
    } else {
      return fetch(this._baseUrl + `/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
      })
        .then(this._getResponseData);
    }
  }
}

const api = new Api({ baseUrl: 'http://localhost:3000', });

export default api;

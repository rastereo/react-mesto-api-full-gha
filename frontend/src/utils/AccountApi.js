class AccountApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _setOptions(password, email) {
    return {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: password,
        email: email
      })
    }
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return res.text()
      .then((error) => {
        return Promise.reject(JSON.parse(error))
      });
  }

  signUp(password, email) {
    return fetch(this._baseUrl + '/signup', this._setOptions(password, email))
      .then(this._getResponseData);
  }

  signIn(password, email) {
    return fetch(this._baseUrl + '/signin', this._setOptions(password, email))
      .then(this._getResponseData);
  }

  signOut() {
    return fetch(this._baseUrl + '/signout', {
      credentials: 'include',
    })
      .then(this._getResponseData);
  }

  validateToken() {
    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
    })
      .then(this._getResponseData);
  }
}

const accountApi = new AccountApi('https://api.rastereo.nomoreparties.sbs');

export default accountApi;

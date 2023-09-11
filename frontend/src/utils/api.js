class Api {
  constructor({baseUrl}) {
    this._baseUrl = baseUrl
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  loadNameAndInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }

  changeNameAndInfo(nameValue, infoValue, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: nameValue,
        about: infoValue,
      }),
    })
    .then(this._checkResponse)
  }

  addNewCardToServer(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }

  removeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }

  addLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }

  removeLike(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }

  updateAvatar(newLink, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: newLink,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked, token) {
		if (isLiked) {
			return this.removeLike(cardId, token);
		} else {
			return this.addLike(cardId, token);
		}
	}
}

export const apiMesto = new Api({
  baseUrl: 'http://localhost:3000',
})

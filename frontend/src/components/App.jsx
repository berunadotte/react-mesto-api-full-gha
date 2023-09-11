import React from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import { Header } from './Header.jsx'
import { Main } from './Main.jsx'
import { Footer } from './Footer.jsx'
import avatar from '../images/avatar_photo.png'
import ImagePopup from './ImagePopup.jsx'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import { apiMesto } from '../utils/api.js'
import EditProfilePopup from './EditProfilePopup.jsx'
import EditAvatarPopup from './EditAvatarPopup.jsx'
import { AddPlacePopup } from './AddPlacePopup.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import InfoTooltip from './InfoTooltip.jsx'
import * as authApi from '../utils/authApi.js'
import registrationError from '../images/registration_error.svg'
import registrationSucces from '../images/registration_succes.svg'

function App() {
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = React.useState(false)
  const [isLoadingProfilePopup, setIsLoadingProfilePopup] =
    React.useState(false)
  const [isLoadingAddPlacePopup, setIsLoadingAddPlacePopup] =
    React.useState(false)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})
  const [isOpenImage, setIsOpenImage] = React.useState(false)
  const [cards, setCards] = React.useState([])
  const [currentUser, setCurrentUser] = React.useState({
    name: 'Жак Ив Кусто',
    about: 'Исследователь океана',
    avatar: avatar,
  })

  const [loggedIn, setLoggedIn] = React.useState(false)
  const [infoTooltipMessage, setInfoTooltipMessage] = React.useState({
    imgPath: '',
    text: '',
  })
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')

  const navigate = useNavigate()

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopup() {
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setSelectedCard({})
    setIsOpenImage(false)
    setIsTooltipOpen(false)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsOpenImage(true)
  }

  function handleCardDelete(id) {
    apiMesto
      .removeCard(id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== id))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleSubmit(request) {
    setIsLoadingAddPlacePopup(true)
    setIsLoadingProfilePopup(true)
    setIsLoadingAvatarPopup(true)
    request()
      .then(closeAllPopup)
      .catch(console.error)
      .finally(() => {
        setIsLoadingAddPlacePopup(false)
        setIsLoadingProfilePopup(false)
        setIsLoadingAvatarPopup(false)
      })
  }

  function handleUpdateUser(inputValues) {
    function makeRequest() {
      return apiMesto
        .changeNameAndInfo(inputValues.name, inputValues.about)
        .then(setCurrentUser)
    }
    handleSubmit(makeRequest)
  }

  function handleUpdateAvatar(inputValue) {
    function makeRequest() {
      return apiMesto.updateAvatar(inputValue.avatar).then(setCurrentUser)
    }
    handleSubmit(makeRequest)
  }

  function handleAddPlaceSubmit(inputValues) {
    function makeRequest() {
      return apiMesto.addNewCardToServer(inputValues).then((newCard) => {
        setCards([newCard, ...cards])
      })
    }
    handleSubmit(makeRequest)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id)

    apiMesto
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  React.useEffect(() => {
    checkToken()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([apiMesto.loadNameAndInfo(), apiMesto.getInitialCards()])
        .then((data) => {
          setCurrentUser(data[0])
          setCards(data[1])
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function checkToken() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            setEmail(res.data.email)
            navigate('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleRegister(email, password) {
    authApi
      .register(email, password)
      .then(() => {
        setInfoTooltipMessage({
          imgPath: registrationSucces,
          text: 'Вы успешно зарегистрировались!',
        })
        navigate('./sign-in')
      })
      .catch(() =>
        setInfoTooltipMessage({
          imgPath: registrationError,
          text: 'Что-то пошло не так! Попробуйте еще раз.',
        })
      )
      .finally(() => setIsTooltipOpen(true))
  }

  function handleLogin(password, email) {
    authApi
      .signIn(password, email)
      .then(() => {
        setEmail(email)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => console.log(err))
  }

  function onSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setEmail('')
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} email={email} onSignOut={onSignOut} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLogin} isTooltipOpen={isTooltipOpen} />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                onRegister={handleRegister}
                isTooltipOpen={isTooltipOpen}
              />
            }
          />
          <Route
            path="*"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoadingProfilePopup}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoadingAvatarPopup}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoadingAddPlacePopup}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
          isOpen={isOpenImage}
        />

        <InfoTooltip
          name="tooltip"
          isOpen={isTooltipOpen}
          onClose={closeAllPopup}
          title={infoTooltipMessage.text}
          imgPath={infoTooltipMessage.imgPath}
        />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import api from '../utils/Api';
import accountApi from '../utils/AccountApi';

import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [isSubmitError, setIsSubmitError] = useState(false);
  const [isEditProfilePopup, setEditProfilePopup] = useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);
  const [email, setEmail] = useState('')
  const [tooltip, setTooltip] = useState('')

  const navigate = useNavigate();

  function handleInfoTooltip(message, isError) {
    setIsInfoTooltip(true);
    setTooltip(message);
    setIsSubmitError(isError);
  }

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatar(true);
  }

  function handleCardDeleteClick(selectedCard) {
    setDeleteCard(selectedCard);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopup() {
    setIsInfoTooltip(false)
    setEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatar(false);
    setDeleteCard(null);
    handleCardClick(null);
  }

  function signInAccount(email) {
    setIsLoggedIn(true);
    setEmail(email);

    navigate('/', { replace: true });
  }

  function signOutAccount() {
    accountApi.signOut()
      .then(() => {
        setIsLoggedIn(false);
        setEmail('');
      })
      .catch(err => console.log(err))
  }

  function handleRegister(password, email) {
    setIsLoading(true);

    accountApi.signUp(password, email)
      .then(() => {
        navigate('/', { replace: true });

        handleInfoTooltip('Вы успешно зарегистрировались!')
      })
      .catch(err => {
        handleInfoTooltip(err.message, true)

        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleLogin(password, email) {
    setIsLoading(true);

    accountApi.signIn(password, email)
      .then((user) => {
        signInAccount(user.data.email)
      })
      .catch(err => {
        handleInfoTooltip(err.message, true)

        console.log(err)
      })
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c)))
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));

        closeAllPopup();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api.patchUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);

        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatarUrl) {
    setIsLoading(true);

    api.patchAvatar(avatarUrl)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);

        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlace({ name, link }) {
    setIsLoading(true);

    api.postCard(name, link)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);

        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    function checkToken() {
      accountApi.validateToken()
        .then((user) => {
          setIsLoggedIn(true);
          setEmail(user.data.email);

          navigate('/', { replace: true });
        })
        .catch((err) => console.log(err));
    }

    if (isLoggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo.data);
          setCards(cards.data.reverse());
        })
        .catch(err => console.log(err));
    } else {
      checkToken()
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            index
            element={
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  email={email}
                  signOut={signOutAccount}
                />
                <ProtectedRouteElement
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopup}
                  onClose={closeAllPopup}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatar}
                  onClose={closeAllPopup}
                  onUpdateAvatar={handleUpdateAvatar}
                  isLoading={isLoading}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopup}
                  onClose={closeAllPopup}
                  onUpdatePlace={handleAddPlace}
                  isLoading={isLoading}
                />
                <DeleteCardPopup
                  isOpen={deleteCard}
                  onClose={closeAllPopup}
                  onCardDelete={() => handleCardDelete(deleteCard)}
                />
                <ImagePopup
                  card={selectedCard}
                  onClose={closeAllPopup}
                />
              </>
            }
          />
          <Route
            path='/sign-in'
            element={
              <>
                <Header link='/sign-up' linkTitle='Регистрация' />
                <Login
                  onLogin={handleLogin}
                  isLoading={isLoading}
                />
              </>
            }
          />
          <Route
            path='/sign-up'
            element={
              <>
                <Header link='/sign-in' linkTitle='Войти' />
                <Register
                  onRegister={handleRegister}
                  isLoading={isLoading}
                />
              </>
            }
          />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltip}
          isError={isSubmitError}
          tooltip={tooltip}
          onClose={closeAllPopup}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;

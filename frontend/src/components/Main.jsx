import { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <button
          type="button"
          className="profile__avatar-button"
          onClick={props.onEditAvatar}
        >
          <img
            src={currentUser?.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser?.name}
          </h1>
          <p className="profile__job">
            {currentUser?.about}
          </p>
          <button
            type="button"
            className="profile__edit-button"
            onClick={props.onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="cards">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;

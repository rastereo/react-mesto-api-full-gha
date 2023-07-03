import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { link, name, likes, owner } = props.card;

  const currentUser = useContext(CurrentUserContext);
  const isOwner = owner === currentUser._id;
  const isLiked = likes.some(like => like === currentUser._id);

  function handleClick() {
    props.onCardClick({ link, name });
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="card">
      <img
        src={link}
        alt={name}
        className="card__image"
        onClick={handleClick}
      />
      {isOwner &&
        <button
          type="button"
          className="card__delete-button"
          onClick={handleDeleteClick}
        ></button>
      }
      <div className="card__container">
        <h2 className="card__description">
          {name}
        </h2>
        <div>
          <button
            type="button"
            className={`card__like-button ${isLiked && 'card__like-button_active'}`}
            onClick={handleLikeClick}
          ></button>
          <p className="card__like-counter">
            {likes.length}
          </p>
        </div>
      </div>
    </article>
  );
}

export default Card;

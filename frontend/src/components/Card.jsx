import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card , onCardClick, onCardLike, onCardDelete}) {

  function handleClick() {
    onCardClick(card);
  } 

  function handleDeleteCard() {
    onCardDelete(card._id)
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  const currentUser = React.useContext(CurrentUserContext)

  const isOwn = card.owner._id === currentUser._id

  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like_active'}`)

  return(
    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="card__container">
        <h2 className="card__label">{card.name}</h2>
        <div className="card__like_container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
          </button>
          <p className="card__like_count">{card.likes.length}</p>
        </div>
      </div> 
      {isOwn && <button className="card__delete-button" onClick={handleDeleteCard}></button>}
    </li>
  )
}
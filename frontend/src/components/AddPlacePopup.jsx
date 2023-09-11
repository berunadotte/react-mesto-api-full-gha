import React from 'react'
import PopupWithForm from './PopupWithForm'

export function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [title, setTitle] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onAddPlace({
      name: title,
      link,
    })
  }

  React.useEffect(() => {
    setTitle('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm
      title="Новое место"
      name="new-card"
      buttonName={isLoading ? 'Сохранение...' : 'Добавить'}
      buttonType="create"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        type="text"
        name="popup__card_name"
        className="popup__input popup__input_card-name-value"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="card-name-input"
        onChange={handleChangeTitle}
      />
      <span className="popup__form-input-error card-name-input-error"></span>
      <input
        value={link}
        type="url"
        name="popup__image_link"
        className="popup__input popup__input_image-link-value"
        placeholder="Ссылка на картинку"
        required
        id="image-link-input"
        onChange={handleChangeLink}
      />
      <span className="popup__form-input-error image-link-input-error"></span>
    </PopupWithForm>
  )
}

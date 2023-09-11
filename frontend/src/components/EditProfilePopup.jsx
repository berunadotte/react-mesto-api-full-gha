import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState(currentUser.name)
  const [description, setDescription] = React.useState(currentUser.about)

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      buttonType="save"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        type="text"
        name="popup__name"
        className="popup__input popup__input_name-value"
        placeholder="Введи своё имя"
        required
        minLength="2"
        maxLength="40"
        id="name-input"
        onChange={handleChangeName}
      />
      <span className="popup__form-input-error name-input-error"></span>
      <input
        value={description}
        type="text"
        name="popup__job"
        className="popup__input popup__input_job-value"
        placeholder="Введи свою профессию"
        required
        minLength="2"
        maxLength="200"
        id="job-input"
        onChange={handleChangeDescription}
      />
      <span className="popup__form-input-error job-input-error"></span>
    </PopupWithForm>
  )
}

import PopupWithForm from './PopupWithForm'
import React from 'react'

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = React.useRef()

  React.useEffect(() => {
    avatarRef.current.value = ' '
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update_avatar"
      buttonName={isLoading ? 'Сохранение...' : 'Сохранить'}
      buttonType="save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        name="popup__avatar_link"
        className="popup__input popup__input_avatar-link-value"
        placeholder="Ссылка на аватар"
        required
        id="avatar-link-input"
      />
      <span className="popup__form-input-error avatar-link-input-error"></span>
    </PopupWithForm>
  )
}

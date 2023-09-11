export default function InfoTooltip({ isOpen, onClose, title, imgPath }) {
  return (
    <div className={`popup popup_infotooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img src={imgPath} alt={imgPath} className="popup__tooltip_image" />
        <h2 className="popup__header_tooltip">{title}</h2>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
}

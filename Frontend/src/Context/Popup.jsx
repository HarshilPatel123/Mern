import  { useEffect } from 'react';
import './Popup.css'
// Popup component
const Popup = ({ onClose, message}) => {
  useEffect(() => {
    // Automatically close popup after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 900);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>{message}</p>
      </div>
    </div>
  );
};


export default Popup
import { useEffect } from 'react';

function UseClosePopupOnKeydown(props) {
  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === 'Escape' && props.action();
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  });
}

export default UseClosePopupOnKeydown;

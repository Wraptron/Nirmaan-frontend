import React from 'react'

function More({isVisible, onClose, children}) {
  if(!isVisible) return null;
    const handleClose = (e) => {
        if(e.target.id === 'wrapper') onClose();
  }
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-xs flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
      style={{ zIndex: 999999 }}
    >
      <div className="md:w-[350px] relative z-50">
        <div className="p-4 bg-white rounded-md shadow-lg">{children}</div>
      </div>
    </div>
  );
}

export default More
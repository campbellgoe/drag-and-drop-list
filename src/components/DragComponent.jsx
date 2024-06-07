import React, { useEffect, useRef, useState } from "react";

const DragComponent = ({ image, title, isDragging }) => {
  const itemRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMove = (event) => {
      const pageX = event.pageX || (event.touches && event.touches[0].pageX);
      const pageY = event.pageY || (event.touches && event.touches[0].pageY);
      setPosition({ x: pageX, y: pageY - scrollY });
    };

    window.addEventListener("touchmove", handleMove);
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchstart", handleMove); // force run move event when starting touch
    window.addEventListener("pointerdown", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchstart", handleMove);
      window.removeEventListener("pointerdown", handleMove);
    };
  }, [isDragging]);

  if (!isDragging) {
    return null;
  }

  return (
    <>
      {isDragging && position.x > 0 && (
        <div
          className={`flex px-4 py-4 h-16 content-box bg-white shadow-xl rounded-lg w-72`}
          ref={itemRef}
          style={{
            position: "fixed",
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none", // Prevents the item from blocking mouse events to other elements
          }}
        >
          <img className="w-8 h-8 object-cover rounded-lg" src={image} />
          <div className="grow flex flex-col justify-center px-4">
            <div className="font-[500] text-[17px] text-[#292B36]">{title.length > 20 ? title.slice(0, 20) + '...' : title}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DragComponent;

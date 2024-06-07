import React, { useEffect, useRef, useState } from "react";
import Location from "../icons/Location";
  const ListItemComponent = ({
    image,
    title,
    location,
    setOnHover,
    onPointerDown,
    onTouchStart,
    isDragging,
    isItemDragging,
  }) => {
    const itemRef = useRef(null);
    const [coverState, setCoverState] = useState();

    const getCoverClassName = () => {
      const defaultClassName = "border-t-transparent border-b-transparent";
      if (!isDragging) return defaultClassName;
      switch (coverState) {
        case "cover_top":
          return "border-b-transparent border-t-[#1E9BF0]";
        case "cover_bottom":
          return "border-t-transparent border-b-[#1E9BF0]";
        default:
          return defaultClassName;
      }
    };

  useEffect(() => {
    const handleMove = (event) => {
      if (itemRef.current && isDragging) {
        const rect = itemRef.current.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = rect.bottom + window.scrollY;
        const left = rect.left + window.scrollX;
        const right = rect.right + window.scrollX;
        const verticalMidpoint = top + (bottom - top) / 2;

        const pageX = event.pageX || (event.touches && event.touches[0].pageX);
        const pageY = event.pageY || (event.touches && event.touches[0].pageY);

        if (
          pageX >= left &&
          pageX <= right &&
          pageY >= top &&
          pageY <= bottom
        ) {
          if (pageY < verticalMidpoint) {
            setCoverState("cover_top");
            setOnHover(0);
          } else {
            setCoverState("cover_bottom");
            setOnHover(1);
          }
        } else {
          setCoverState("outside");
        }
      }
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("touchmove", handleMove);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [isDragging]);

  return (
    <div
      className={`flex px-4 py-4 h-[100] content-box border-y-2 ${
        isDragging && isItemDragging
          ? "bg-[#F4F5F6] opacity-60"
          : "bg-white opacity-100"
      }
        ${getCoverClassName()}`}
      ref={itemRef}
      onPointerDown={onPointerDown}
      onTouchStart={onTouchStart}
    >
      <img
        className="w-24 h-24 object-cover rounded-lg"
        src={image}
        onMouseDown={(e) => e.preventDefault()}
      />
      <div className="grow flex flex-col justify-center ml-12">
        <div className="text-[19px] font-[500] text-[#292B36]">{title}</div>
        <div className="text-[17px] font-[400] text-[#A8A9AE] flex items-center gap-1">
          <Location />
          {location}
        </div>
      </div>
    </div>
  );
};

export default ListItemComponent;

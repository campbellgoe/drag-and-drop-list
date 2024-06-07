import React, { useEffect, useState } from "react";
import ListItemComponent from "./ListItemComponent";
import DragComponent from "./DragComponent";
import { itemList } from "./data";

function DraggableList() {
  const [hoverIndex, setHoverIndex] = useState();
  const [draggingItem, setDraggingItem] = useState();
  const [isDragging, setIsDragging] = useState(false);
  const [listData, setListData] = useState(itemList);

  const handlePointerDown = (idx, event) => {
    setDraggingItem(listData[idx]);
    setIsDragging(true);
    // Disable scrolling while dragging
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    const handlePointerUp = () => {
      setIsDragging(false);
      // Re-enable scrolling after dragging
      document.body.style.overflow = "auto";
      if (hoverIndex !== undefined && draggingItem !== undefined) {
        const newListData = [...listData];
        let removingIndex = newListData.indexOf(draggingItem);
        if (hoverIndex < removingIndex) removingIndex++;
        newListData.splice(hoverIndex, 0, draggingItem);
        newListData.splice(removingIndex, 1);
        setListData(newListData);
      }
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [hoverIndex, draggingItem, listData]);

  return (
    <>
      <div className="select-none">
        {listData.map((listItem, idx) => (
          <ListItemComponent
            key={idx}
            isDragging={isDragging}
            onPointerDown={(event) => handlePointerDown(idx, event)}
            onTouchStart={(event) => handlePointerDown(idx, event)}
            setOnHover={(offset) => setHoverIndex(idx + offset)}
            title={listItem.title}
            image={listItem.image}
            location={listItem.location}
            isItemDragging={listData.indexOf(draggingItem) === idx}
          />
        ))}
      </div>
      {draggingItem && isDragging && (
        <DragComponent
          title={draggingItem.title}
          image={draggingItem.image}
          location={draggingItem.location}
          isDragging={true}
        />
      )}
    </>
  );
}

export default DraggableList;

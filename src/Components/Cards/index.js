import React from "react";
import { CardContainer } from "./styles";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Card({ card }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "Card",
      card,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };


  return (
    <CardContainer
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {card.name}
    </CardContainer>
  );
}

export default Card;

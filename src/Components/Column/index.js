import React, { useMemo } from "react";
import { ColumnContainer, ColumnContent, ColumnHeader } from "./styles";
import Card from "../Cards";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
function Column({ column, cards, styles }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const cardsIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);

  return (
    <ColumnContainer style={style} >
      <ColumnHeader
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        backgroundColor={styles?.backgroundColor}
        color={styles?.color}
      >
        {column.name}
      </ColumnHeader>
      <ColumnContent>
        <SortableContext items={cardsIds}>
          {cards.map((card) => (
            <Card card={card}></Card>
          ))}
        </SortableContext>
      </ColumnContent>
    </ColumnContainer>
  );
}

export default Column;

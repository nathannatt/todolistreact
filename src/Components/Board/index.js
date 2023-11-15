import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useMemo, useState } from "react";
import Column from "../Column";
import { BoardContainer } from "./styles";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Card from "../Cards";

function Board() {
  const [columns, setColumns] = useState([
    {
      id: 1,
      name: "To Do",
      styles: {
        color: "#fff",
        backgroundColor: "#833030",
      },
    },
    {
      id: 2,
      name: "In Progress",
      styles: {
        color: "#fff",
        backgroundColor: "#B97B39",
      },
    },
    {
      id: 3,
      name: "Review",
      styles: {
        color: "#fff",
        backgroundColor: "#D1AC00",
      },
    },
    {
      id: 4,
      name: "Done",
      styles: {
        color: "#fff",
        backgroundColor: "#AEC876",
      },
    },
  ]);
  const [cards, setCards] = useState([
    {
      id: 1,
      parentId: 1,
      name: "card1",
    },
    {
      id: 2,
      parentId: 1,
      name: "cardtest",
    },
    {
      id: 3,
      parentId: 2,
      name: "card2",
    },
    {
      id: 4,
      parentId: 3,
      name: "card3",
    },
  ]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeCard, setActiveCard] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveCard(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active?.id;
    const overId = over?.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";

    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId); 
      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    console.log("activeId", activeId)
    console.log("overId", overId)
    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Card";
    const isOverATask = over.data.current?.type === "Card";

    if (!isActiveATask) return;

    // Im dropping a Card over another Card
    if (isActiveATask && isOverATask) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((t) => t.id === activeId);
        const overIndex = cards.findIndex((t) => t.id === overId);

        if (cards[activeIndex].parentId != cards[overIndex].parentId) {
          // Fix introduced after video recording
          cards[activeIndex].parentId = cards[overIndex].parentId;
          return arrayMove(cards, activeIndex, overIndex - 1);
        }

        return arrayMove(cards, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Card over a column
    if (isActiveATask && isOverAColumn) {
      setCards((cards) => {
        const activeIndex = cards.findIndex((t) => t.id === activeId);

        cards[activeIndex].parentId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(cards, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <BoardContainer>
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <Column
              styles={col.styles}
              column={col}
              cards={cards.filter((card) => card.parentId === col.id)}
            />
          ))}
        </SortableContext>
      </BoardContainer>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Column
              column={activeColumn}
              cards={cards.filter((card) => card.parentId === activeColumn.id)}
            />
          )}
          {activeCard && <Card props={activeCard} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default Board;

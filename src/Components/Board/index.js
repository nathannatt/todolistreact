import { DndContext } from "dnd-kit";
import React, { useState } from "react";
import Column from "../Column";
import { BoardContainer } from "./styles";

function Board() {
  const [columns, setColumns] = useState([
    {
        id: 1,
      name: "To Do",
      styles: {
        color: "#D4FC9D",
        backgroundColor: "#70845A",
      }
    },
    {
        id: 2,
      name: "In Progress",
      styles: {
        color: "#84DCD1",
        backgroundColor: "#5D908A",
      }
    },
    {
      id: 3,
      name: "Review",
      styles: {
        color: ""
      }
    },
    {
        id: 4,
      name: "Done",
    },
  ]);
  const [cards, setCards] = useState([
    {
        parentId: 1,
      name: "card1",
    },
    {
        parentId: 1,
      name: "cardtest",
    },
    {
        parentId: 2,
      name: "card2",
    },
    {
        parentId: 3,
      name: "card3",
    },
  ]);
  return (
    <DndContext>
      <BoardContainer>
        {columns.map((col) => (
          <Column styles={col.styles} column={col} cards={cards.filter(card => card.parentId===col.id)}></Column>
        ))}
      </BoardContainer>
    </DndContext>
  );
}

export default Board;

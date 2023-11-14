import React from "react";
import { ColumnContainer, ColumnHeader } from "./styles";
import Card from "../Cards";

function Column({ column, cards, styles }) {
  return (
    <ColumnContainer backgroundColor={styles?.backgroundColor}>
      <ColumnHeader color={styles?.color} >{column.name}</ColumnHeader>
      {cards.map((card) => (
        <Card card={card}></Card>
      ))}
    </ColumnContainer>
  );
}

export default Column;

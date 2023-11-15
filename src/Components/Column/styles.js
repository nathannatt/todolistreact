import styled from "styled-components";

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f7f7f7;
  border-radius: 4px;
`;
export const ColumnHeader = styled.div`
  display: flex;
  justify-content: center;
  color: #000;
  font-size: 12px;
  padding: .2rem;
  color: ${(props) => props.color};
  border-start-end-radius: 4px;
  border-start-start-radius: 4px;
  background-color: ${(props) => props.backgroundColor};
`;

export const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #d9d9d9;
  height: 100%;
`;

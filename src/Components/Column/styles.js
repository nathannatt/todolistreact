import styled from "styled-components";

export const ColumnContainer = styled.div`
display: flex;
flex-direction: column;
padding: .5rem;
gap: .5rem;
width: 100%;
font-family: cursive;
border-style: solid;
background-color: ${props =>props.backgroundColor};
`;

export const ColumnHeader = styled.div`
display: flex;
justify-content: center;
width: 100%;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
border-style: solid;
color: ${props =>props.color}
`;

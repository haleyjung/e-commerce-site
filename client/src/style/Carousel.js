import styled from "styled-components";

// related-products.jsx
export const CarousalContainer = styled.div`
  border: 1px solid red;
`
export const CardsContainer = styled.div`
  border: 1px solid orange;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Cards.jsx
export const Card = styled.div`
  width: 220px;
  height: 90%;
  display: flex;
  align-items: center;
  border: 1px solid blue;
  overflow: hidden;
`;

export const CarouselImage = styled.img`
  width: 100px;
  display: flex;
  position: absolute;
`;

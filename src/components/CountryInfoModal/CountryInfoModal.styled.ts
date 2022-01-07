import styled from 'styled-components';

export const CountryInfoRoot = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 20;
  height: auto;
  width: 300px;
  margin: 1rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: height 0.3s ease;
`;

export const CountryInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
`;

export const CountryName = styled.h2`
  margin: 0;
  font-weight: 400;
`;

export const CountryFlag = styled.img`
  width: 50px;
  object-fit: contain;
  border: 1px solid #000000;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

import styled, { css } from 'styled-components';

const ModalRoot = styled.div<{ visible: boolean }>(
  ({ visible }) => css`
    position: absolute;
    bottom: 0;
    z-index: 20;
    min-width: 300px;
    margin: 1rem;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    transition: all 0.5s ease;

    ${visible
      ? css`
          left: 350px;
          opacity: 1;
        `
      : css`
          left: 0;
          opacity: 0;
        `}
  `
);

const ModalTitle = styled.h2`
  position: relative;
  margin: 0;
  font-weight: 400;
`;

const CountryCounter = styled.span`
  font-size: 1rem;
  position: absolute;
  right: 0;
  top: 5px;
`;

const CountrySelectionDataContainer = styled.div`
  margin: 1rem 0;
`;

const CountryChip = styled.span`
  margin-right: 5px;
  padding: 5px;
  border-radius: 5px;
  background: #8cd2d3;
`;

const RemoveCountryButton = styled.button`
  margin-left: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export {
  ModalRoot,
  ModalTitle,
  CountryCounter,
  CountrySelectionDataContainer,
  CountryChip,
  RemoveCountryButton,
};

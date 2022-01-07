import styled, { css } from 'styled-components';

const FullScreenLoaderRoot = styled.div<{ visible?: boolean }>(
  () => css`
    position: absolute;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: floralwhite;
  `
);

const LoaderTitle = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  animation: zoom-in-n-out 2s infinite;

  @keyframes zoom-in-n-out {
    50% {
      transform: scale(1.5);
    }
  }
`;

export { FullScreenLoaderRoot, LoaderTitle };

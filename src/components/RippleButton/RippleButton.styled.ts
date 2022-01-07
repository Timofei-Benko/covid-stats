import styled, { css } from 'styled-components';
import { TRipple } from './RippleButton.types';

const ButtonRoot = styled.div<{ width?: string; disabled?: boolean }>(
  ({ width, disabled }) => css`
    position: relative;
    height: 16px;
    width: ${width || 'fit-content'};
    padding: 10px;
    text-align: center;
    border-radius: 4px;
    background: #e0e0e0;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%),
      0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
    overflow: hidden;
    cursor: pointer;

    ${disabled &&
    css`
      //box-shadow: none;
      cursor: not-allowed;

      > span {
        color: #abaaaa;
      }
    `}
  `
);

const ButtonTitle = styled.span`
  display: block;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-transform: uppercase;
`;

const Ripple = styled.div<TRipple>(
  ({ x, y, width, animDur }) => css`
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    width: ${width}px;
    height: ${width}px;
    opacity: 1;
    transform: scale(0);
    animation: ripple ${animDur}ms;

    @keyframes ripple {
      to {
        opacity: 0;
        transform: scale(4);
      }
    }
  `
);

export { ButtonRoot, ButtonTitle, Ripple };

import { MouseEvent, useState } from 'react';
// TODO: I dont wanna make two separate imports from one file, but I want to export s-c so that I can use them as
//  Styled.<ComponentName>
import * as Styled from './RippleButton.styled';
import { TRipple } from './RippleButton.types';

type TRippleButtonProps = {
  title: string;
  width?: string;
  disabled?: boolean;
  onClick?: () => void;
};

type TRipples = Omit<TRipple, 'animDur'>;

const ANIMATION_DURATION_MS = 1000;

function RippleButton(props: TRippleButtonProps) {
  const [ripples, setRipples] = useState<TRipples[] | []>([]);
  const [cleanUpTimeoutId, setCleanUpTimeoutId] =
    useState<NodeJS.Timeout | null>(null);

  function startCleanUp() {
    setCleanUpTimeoutId(
      setTimeout(() => {
        setRipples([]);
      }, ANIMATION_DURATION_MS)
    );
  }

  function discardCleanUp() {
    if (cleanUpTimeoutId) {
      clearTimeout(cleanUpTimeoutId);
    }
  }

  function handleRippleEffect(e: MouseEvent<HTMLDivElement>) {
    const diameter = Math.max(
      e.currentTarget.offsetWidth,
      e.currentTarget.offsetHeight
    );
    const pos = e.currentTarget.getBoundingClientRect();
    const radius = diameter / 2;
    discardCleanUp();
    setRipples([
      ...ripples,
      {
        x: e.pageX - pos.x - radius,
        y: e.pageY - pos.y - radius,
        width: diameter,
      },
    ]);
    startCleanUp();
  }

  return (
    <Styled.ButtonRoot
      width={props.width}
      disabled={props.disabled}
      onClick={(e) => {
        if (props.disabled) return;
        props.onClick && props.onClick();
        handleRippleEffect(e);
      }}
    >
      {ripples.map((coords, i) => (
        <Styled.Ripple
          key={`ripple-id-${i}`}
          x={coords.x}
          y={coords.y}
          width={coords.width}
          animDur={ANIMATION_DURATION_MS}
        />
      ))}
      <Styled.ButtonTitle>{props.title}</Styled.ButtonTitle>
    </Styled.ButtonRoot>
  );
}

export { RippleButton };

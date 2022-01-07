import React from 'react';
import { TSvgTextCoords } from './types';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../redux/store';

export const TotalCasesCenteredMetric = ({ centerX, centerY }: TSvgTextCoords) => {
  const countryData = useSelector((store: TRootState) => store.singleCountry);

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '2rem',
        fontWeight: 600,
      }}
    >
      {countryData.cases}
    </text>
  );
};

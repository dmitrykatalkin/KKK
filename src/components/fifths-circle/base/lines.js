import React from "react";
import PropTypes from 'prop-types';

const PIECE_ANGLE = 360 / 12;
const sectors = Array.from({ 
  length: 12 
});

export const Lines = (props, context) => {
  const { cx, cy, circleRadius } = context;

  return (
    <g transform={`rotate(${PIECE_ANGLE / 2} ${cx} ${cy})`}>
      {sectors.map((s, i) => (
        <line 
          className="Base__cross-line"
          x1={cx} 
          y1={cx - circleRadius} 
          x2={cy} 
          y2={cx + circleRadius}
          transform={`rotate(${i * PIECE_ANGLE} ${cx} ${cy})`} />
      ))}
    </g>
  )
};

///

Lines.contextTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  circleRadius: PropTypes.number
}

import React from "react";
import PropTypes from 'prop-types';

export const Defs = (props, context) => {
  const { cx, cy } = context;

  return (
    <defs>
      <mask id="inner-circle-clip">
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <circle
          fill="black"
          cx={cx}
          cy={cy}
          r="198"
        />
      </mask>
    </defs>
  )
};

Defs.contextTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  circleRadius: PropTypes.number
}

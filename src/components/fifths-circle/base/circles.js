import React from "react";
import PropTypes from 'prop-types';

const MIDDLE_SHIFT = 0.68;
const INNER_SHIFT = 0.412;

export const Circles = (props, context) => {
  const { cx, cy, circleRadius } = context;

  return (
    <g>

      <circle
        className="Base__circle Base__circle--outer"
        cx={cx}
        cy={cy}
        r={circleRadius}
      />

      <circle
        className="Base__circle Base__circle--middle"
        cx={cx}
        cy={cy}
        r={+circleRadius * MIDDLE_SHIFT}
      />

      <circle
        className="Base__circle Base__circle--inner"
        cx={cx}
        cy={cy}
        r={+circleRadius * INNER_SHIFT}
      />

    </g>
  )
};

///

Circles.contextTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  circleRadius: PropTypes.number
}

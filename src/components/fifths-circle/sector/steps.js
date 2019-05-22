import React from "react";

const BASE_SHIFT = -40;
const STEP_SHIFT = 30;
const OUTER_POS = 80;
const INNER_POS = 220;

const STEP_NAMES = {
  major: {
    outer: ['IV', 'I', 'V'],
    inner: ['ii', 'vi', 'iii']
  },
  minor: {
    outer: ['VI', 'III', 'VII'],
    inner: ['iv', 'i', 'v']
  }
}

export function Steps(props) {
  const { type, cx, cy, pos } = props;
  const outerSteps = STEP_NAMES[type].outer;
  const innerSteps = STEP_NAMES[type].inner;
  const shift = [-40, -10, 20];

  return (
    <g>

      {outerSteps.map((step, i) => (
        <g
          key={i.toString()}
          transform={`rotate(${shift[i]} ${cx} ${cy})`}>

          <text
            className={`Sector__step Sector__step--type-${type}`}
            dx={cx}
            dy={OUTER_POS}
            transform={`rotate(${pos * -STEP_SHIFT - shift[i]} ${cx} ${OUTER_POS - 15})`}>
            {step}
          </text>
        </g>
      ))}

      {innerSteps.map((step, i) => (
        <g
          key={i.toString()}
          transform={`rotate(${shift[i]} ${cx} ${cy})`}>

          <text
            className={`Sector__step Sector__step--type-${type}`}
            dx={cx}
            dy={INNER_POS}
            transform={`rotate(${pos * -STEP_SHIFT - shift[i]} ${cx} ${INNER_POS - 15})`}>
            {step}
          </text>
        </g>
      ))}

    </g>
  );
}

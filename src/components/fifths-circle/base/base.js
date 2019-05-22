import React from "react";

import { Circles } from './circles';
import { Lines } from './lines';

export const Base = (props) => {
  return (
    <g mask="url(#inner-circle-clip)">
      <Circles />
      <Lines />
    </g>
  )
};

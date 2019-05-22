import './sector.css';

import React from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Steps } from './steps';

const Types = {
  Chord: 'chord',
  Key: 'key'
}

const Qualities = {
  Major: 'major',
  Minor: 'minor'
}

///

export const Sector = (props, context) => {
  const { type, rank, quality, pos } = props;
  const { cx, cy } = context;

  const className = classnames(
    'Sector',
    `Sector--type-${type}`,
    `Sector--quality-${quality}`,
    `Sector--rank-${rank}`
  );

  return (
    <g 
      className={className}
      transform={`rotate(${pos * 30} ${cx} ${cy})`}>

      {
        type === Types.Chord ? (
          quality === 'major'
            ? <MajorPath />
            : <MinorPath />
        ) : null
      }

      {
        type === Types.Key && [
          <KeyPath quality={quality} cx={cx} cy={cy} />,
          rank === 'primary' 
            ? <Steps type={quality} pos={pos} cx={cx} cy={cy} />
            : null
        ]
      }

    </g>
  )
};

///

Sector.contextTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  circleRadius: PropTypes.number
}

///

function MajorPath() {
  return (
    <path
      d="m 426.58594,193.23828 c 54.32811,-14.69247 111.15932,-15.30496 170.82031,0 L 637.78606,42.560048 c -79.36871,-20.472668 -162.54951,-23.55853 -251.57212,0 z"
    />
  );
}

function MinorPath() {
  return (
    <path
      d="m 563.76172,318.8125 c -29.78816,-7.56742 -62.4693,-10.49754 -103.52734,0 L 426.58594,193.23828 c 20.58602,-5.4082 83.57694,-22.23468 170.82031,0 z"  />
  );
}

///

function KeyPath(props) {
  const { quality } = props;

  return (
    <path
      transform={`rotate(-30 ${props.cx} ${props.cy})`}
      d="M 460.23438,318.8125 386.21394,42.560048 C 683.31785,-33.603255 926.91867,166.97203 981.43995,386.21394 L 705.14901,460.24588 C 678.31138,360.9955 576.49858,289.01844 460.23438,318.8125 Z"
    />
  );
}


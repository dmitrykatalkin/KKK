import React from "react";
import PropTypes from 'prop-types';

import './fifths-circle.css';

import { Defs } from './defs';
import { Base } from './base/base';
import { ChordsNamesCircle } from './chord-names/chord-names';
import { Sector } from './sector/sector';

const SVG_WIDTH = 1024;
const SVG_HEIGHT = 1024;
const SVG_CX = SVG_WIDTH / 2;
const SVG_CY = SVG_HEIGHT / 2;
const CIRCLE_RADIUS = SVG_WIDTH / 2 - 26; // 486

const CHORD_SELECT_TYPES = {
  None: null,
  Active: 1,
  Selected: 2,
  Sector: 3
}

// const PIECE_ANGLE = 360 / 12;
// const sectors = Array.from({
//   length: 12
// });

// const major = ['C', 'G', 'D', 'A', 'E', 'Cb,B', 'Gb,F#', 'Db', 'Ab', 'Eb', 'F'];
// const minor = [];

export class FifthsCircle extends React.Component {
  static childContextTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    circleRadius: PropTypes.number
  }

  static defaultProps = {
    svgRef: () => { }
  }

  state = {
    primaryKeys: [],
    secondaryKeys: [],
    selectedChords: []
  };

  getChildContext() {
    return {
      cx: SVG_CX,
      cy: SVG_CY,
      circleRadius: CIRCLE_RADIUS
    };
  }

  ///

  handleSelect = ({ type, index, isKeyRoot, isPrimary }) => {
    if (isKeyRoot && isPrimary) {
      this.selectPrimaryKey(type, index);
    }

    if (isKeyRoot && !isPrimary) {
      this.selectSecondaryKey(type, index);
    }

    if (!isKeyRoot) {
      this.selectChord(type, index);
    }
  }

  ///

  selectPrimaryKey(type, index) {
    this.setState(state => {
      let { primaryKeys } = state;
      const keyPos = primaryKeys.findIndex(key => this.isRootMatch(key, type, index));

      return {
        ...state,
        primaryKeys: keyPos === -1
          ? [{ type, index }]
          : primaryKeys.filter(key => !this.isRootMatch(key, type, index)),
        secondaryKeys: []
      }
    })
  }

  selectSecondaryKey(type, index) {
    this.setState(state => {
      let { secondaryKeys } = state;
      const keyPos = secondaryKeys.findIndex(key => this.isRootMatch(key, type, index));

      return {
        ...state,
        secondaryKeys: keyPos === -1
          ? secondaryKeys.concat({ type, index })
          : secondaryKeys.filter(key => !this.isRootMatch(key, type, index))
      }
    })
  }

  selectChord(type, index) {
    this.setState(state => {
      const { selectedChords } = state;
      let { selectType = 0 } = selectedChords.find(key => this.isRootMatch(key, type, index)) || {};
      selectType = (selectType + 1) % (Object.keys(CHORD_SELECT_TYPES).length);

      return {
        ...state,
        selectedChords: selectedChords
          .filter(key => !this.isRootMatch(key, type, index))
          .concat({ type, index, selectType })
      }
    });
  }

  isRootMatch(key, type, index) {
    return key.type === type && key.index === index;
  }

  getRootsList(keys) {
    return keys.map(({ index, type }) => {
      return {
        index,
        type
      }
    });
  }

  ///

  render() {
    const { svgRef } = this.props;
    const { primaryKeys, secondaryKeys, selectedChords } = this.state;

    const roots = [
      ...this.getRootsList(primaryKeys),
      ...this.getRootsList(secondaryKeys)
    ];

    return (
      <svg
        ref={svgRef}
        className="FifthsCircle"
        onContextMenu={(e) => e.preventDefault()}
        x={0}
        y={0}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>

        <Defs />
        <Base />

        {secondaryKeys.map(key =>
          <Sector key={key.index}
            type="key"
            rank="secondary"
            quality={key.type}
            pos={+key.index}
          />
        )}


        {primaryKeys.map(key =>
          <Sector key={key.index}
            type="key"
            rank="primary"
            quality={key.type}
            pos={+key.index}
          />
        )}

        {selectedChords
          .filter(chord => chord.selectType === CHORD_SELECT_TYPES.Sector)
          .map(chord =>
            <Sector key={chord.type + chord.index}
              type="chord"
              rank="secondary"
              quality={chord.type}
              pos={+chord.index}
            />
        )}

        <g className="ChordNames">

          <ChordsNamesCircle
            type="major"
            roots={roots}
            radiusShift={0.78}
            selected={selectedChords}
            onSelect={this.handleSelect}
          />

          <ChordsNamesCircle
            type="minor"
            roots={roots}
            radiusShift={0.5}
            selected={selectedChords}
            onSelect={this.handleSelect}
          />

        </g>

      </svg>
    )
  }
}

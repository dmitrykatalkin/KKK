import React from "react";
import PropTypes from 'prop-types';
import classnames from 'classnames';

const MAJOR_LABELS = [
  <tspan>C</tspan>,
  <tspan>G</tspan>,
  <tspan>D</tspan>,
  <tspan>A</tspan>,
  <tspan>E</tspan>,
  <tspan>
    <tspan>C</tspan><tspan className="ChordNames__accidental">♭</tspan>
    <tspan>B</tspan>
  </tspan>,
  <tspan>
    <tspan>G</tspan><tspan className="ChordNames__accidental">♭</tspan>
    <tspan>F</tspan><tspan className="ChordNames__accidental">♯</tspan>
  </tspan>,
  <tspan>
    <tspan>D</tspan><tspan className="ChordNames__accidental">♭</tspan>
  </tspan>,
  <tspan>
    <tspan>A</tspan><tspan className="ChordNames__accidental">♭</tspan>
  </tspan>,
  <tspan>
    <tspan>E</tspan><tspan className="ChordNames__accidental">♭</tspan>
  </tspan>,
  <tspan>
    <tspan>B</tspan><tspan className="ChordNames__accidental">♭</tspan>
  </tspan>,
  <tspan>
    F
  </tspan>
];

const MINOR_LABELS = [
  <tspan>Am</tspan>,
  <tspan>Em</tspan>,
  <tspan>Bm</tspan>,
  <tspan>
    <tspan>F</tspan><tspan class="ChordNames__accidental">♯</tspan>m
  </tspan>,
  <tspan>
    <tspan>C</tspan><tspan class="ChordNames__accidental">♯</tspan>m
  </tspan>,
  <tspan>
    <tspan>G</tspan><tspan class="ChordNames__accidental">♯</tspan>m
  </tspan>,
  <tspan>
    <tspan>E</tspan><tspan class="ChordNames__accidental">♭</tspan>m
  </tspan>,
  <tspan>
    <tspan>B</tspan><tspan class="ChordNames__accidental">♭</tspan>m
  </tspan>,
  <tspan>Fm</tspan>,
  <tspan>Cm</tspan>,
  <tspan>Gm</tspan>,
  <tspan>Dm</tspan>
];

export class ChordsNamesCircle extends React.Component {

  static contextTypes = {
    cx: PropTypes.number,
    cy: PropTypes.number,
    circleRadius: PropTypes.number
  }

  static defaultProps = {
    onSelect: () => { },
    roots: []
  }

  getSelectType(type, index) {
    const { selected = [] } = this.props;
    const selectedChord = selected.find(chord => {
      return (
        type === chord.type &&
        index === chord.index &&
        chord.selectType > 0
      );
    })

    return selectedChord 
      ? +selectedChord.selectType
      : 0;
  }

  belongsToAnyKey(i) {
    const { roots = [] } = this.props;

    return roots
      .find(({ index }) => (
        (index === i) ||
        (this.abs(index - 1) === i) ||
        (this.abs(index + 1) === i)
      )) !== undefined;
  }

  abs(relativeIndex) {
    return (12 + relativeIndex) % 12;
  }

  render() {
    const { type, roots, radiusShift, onSelect } = this.props;
    const { cx, cy, circleRadius } = this.context;
    
    const labels = type === 'major'
      ? MAJOR_LABELS
      : MINOR_LABELS;

    const circleRoots = roots
      .filter(root => root.type === type)
      .map(root => root.index);

    return (
      <g>
        {
          labels.map((chordLabel, i) => (
            <g
              key={i.toString()}
              onClick={(e) => {
                onSelect({
                  type,
                  index: i,
                  isKeyRoot: true,
                  isPrimary: !e.ctrlKey
                });
              }}
              onContextMenu={(e) => {
                onSelect({
                  type,
                  index: i,
                  isKeyRoot: false
                  
                });
              }}
              transform={`rotate(${i * 30} ${cx} ${cy})`}>

              <text
                className={classnames(
                  'ChordNames__chord',
                  `ChordNames__chord--type-${type}`,
                  {
                    'is-root': circleRoots.includes(i),
                    'is-active': this.getSelectType(type, i) > 0 || this.belongsToAnyKey(i),
                    'is-highlighted': this.getSelectType(type, i) === 2
                  }
                )}
                dx={cx}
                dy={cy - circleRadius * radiusShift}
                transform={`rotate(${i * -30} ${cx} ${cy - circleRadius * radiusShift - 25})`}>

                {chordLabel}
              </text>
            </g>
          ))
        }
      </g>
    );
  }
}

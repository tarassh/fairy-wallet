// @flow
import React from 'react';
import PropTypes from 'prop-types'
import { getClasses } from './utils';

const FairyContainerColumn = (props) => {
  const classes = [
    "column",
    props.position,
    `separator-${props.separator}`
  ];

  return (
    <div className={getClasses(classes)}>
      {props.children}
    </div>);
};

FairyContainerColumn.propTypes = {
  children: PropTypes.node,
  position: PropTypes.oneOf(['left', 'right', 'middle', '']),
  separator: PropTypes.oneOf(['right', 'left', 'none']),
};

FairyContainerColumn.defaultProps = {
  children: [],
  position: '',
  separator: 'none'
};

export default FairyContainerColumn;
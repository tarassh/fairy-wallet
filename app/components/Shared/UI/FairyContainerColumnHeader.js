// @flow
import React from 'react';
import PropTypes from 'prop-types'
import { getClasses, addClassIfProp } from './utils';

const FairyContainerColumnHeader = (props) => {
  const classes = [
    "header",
    addClassIfProp(props.underlined, "underlined")
  ];

  return (
    <div className={getClasses(classes)}>
      {props.children}
    </div>);
};

FairyContainerColumnHeader.propTypes = {
  children: PropTypes.node,
  underlined: PropTypes.bool,
};

FairyContainerColumnHeader.defaultProps = {
  children: [],
  underlined: false
};

export default FairyContainerColumnHeader;
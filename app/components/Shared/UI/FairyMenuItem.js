import React from 'react';
import PropTypes from 'prop-types';
import { getClasses } from './utils';

const FairyMenuItem = (props) => { 
  const classes = [
    "menu-item"
  ];

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <div className={getClasses(classes)}>
      {props.children}
    </div>
  );
}

FairyMenuItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

FairyMenuItem.defaultProps = {
  children: [],
  className: ""
};

export default FairyMenuItem;
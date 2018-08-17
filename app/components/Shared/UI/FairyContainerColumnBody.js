// @flow
import React from 'react';
import PropTypes from 'prop-types'
import { getClasses } from './utils';

const FairyContainerColumnBody = (props) => {
  const classes = [
    "body"
  ];

  return (
    <div className={getClasses(classes)}>
      {props.children}
    </div>);
};

FairyContainerColumnBody.propTypes = {
  children: PropTypes.node
};

FairyContainerColumnBody.defaultProps = {
  children: []
};

export default FairyContainerColumnBody;
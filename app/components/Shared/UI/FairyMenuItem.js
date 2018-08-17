import React from 'react';
import PropTypes from 'prop-types';

const FairyMenuItem = (props) => (
  <div className="menu-item">
    {props.children}
  </div>);

FairyMenuItem.propTypes = {
  children: PropTypes.node
}

FairyMenuItem.defaultProps = {
  children: []
};

export default FairyMenuItem;
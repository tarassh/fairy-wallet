import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FairyMenuItem from './FairyMenuItem';

const FairyMenu = (props) => (
  <div className="fairy-menu">
    {_.map(props.children, (item, index) => 
      [item, index < props.children.length - 1 ? <div key={index} className="separator">&nbsp;</div> : ""]
    )}
  </div>);

FairyMenu.MenuItem = FairyMenuItem;

FairyMenu.propTypes = {
  children: PropTypes.node
}

FairyMenu.defaultProps = {
  children: []
};

export default FairyMenu;
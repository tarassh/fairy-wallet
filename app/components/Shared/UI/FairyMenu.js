import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import FairyMenuItem from './FairyMenuItem';
import { getClasses } from './utils';

const FairyMenu = (props) => {
  const classes = [
    "fairy-menu"
  ]

  if (props.className) {
    classes.push(props.className);
  }

  return (
    <div className={getClasses(classes)}>
      {_.map(props.children, (item, index) => 
      [item, index < props.children.length - 1 && props.separator ? <div key={index} className="separator">&nbsp;</div> : ""]
    )}
    </div>
  );

}

FairyMenu.MenuItem = FairyMenuItem;

FairyMenu.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  separator: PropTypes.bool
}

FairyMenu.defaultProps = {
  children: [],
  className: "",
  separator: true
};

export default FairyMenu;
import React from 'react';
import PropTypes from 'prop-types';
import { getClasses } from './utils';

const ScrollingTable = (props) => {
  const classes = [
    "scrolling-table"
  ];

  if (props.className) {
    classes.push(props.className)
  }

  return (
    <div className={getClasses(classes)}>
      { 
        props.header &&
        <div className="scrolling-table-header underline">
          {props.header}
        </div>
      }
      <div className="scrolling-table-body">
        <div className="scrolling-table-content">
          {props.content}
        </div>
      </div>
    </div>
  )
};

ScrollingTable.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node,
  className: PropTypes.string
}

ScrollingTable.defaultProps = {
  header: undefined,
  content: [],
  className: ""
};

export default ScrollingTable;
import React from 'react';
import PropTypes from 'prop-types';

const ScrollingTable = (props) => (
  <div className="scrolling-table">
    <div className="scrolling-table-header underline">
      {props.header}
    </div>
    <div className="scrolling-table-body">
      <div className="scrolling-table-content">
        {props.content}
      </div>
    </div>
  </div>);

ScrollingTable.propTypes = {
  header: PropTypes.node,
  content: PropTypes.node
}

ScrollingTable.defaultProps = {
  header: [],
  content: []
};

export default ScrollingTable;
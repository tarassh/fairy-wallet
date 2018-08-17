import React from 'react';
import PropTypes from 'prop-types';

const FairyDataBlock = (props) => (
  <div className="data-block">
    <div className="data">
      {props.data}
    </div>
    <div className="description">
      {props.description}
    </div>
  </div>);

FairyDataBlock.propTypes = {
  data: PropTypes.node,
  description: PropTypes.node
}

FairyDataBlock.defaultProps = {
  data: [],
  description: []
};

export default FairyDataBlock;
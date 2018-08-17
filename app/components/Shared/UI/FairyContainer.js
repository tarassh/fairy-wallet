import React from 'react';
import PropTypes from 'prop-types';
import FairyContainerColumn from './FairyContainerColumn';
import FairyContainerColumnHeader from './FairyContainerColumnHeader';
import FairyContainerColumnBody from './FairyContainerColumnBody';

const FairyContainer = (props) => (
  <div className="fairy-container">
    {props.children}
  </div>);

FairyContainer.Column = FairyContainerColumn;
FairyContainer.Column.Header = FairyContainerColumnHeader;
FairyContainer.Column.Body= FairyContainerColumnBody;

FairyContainer.propTypes = {
  children: PropTypes.node
}

FairyContainer.defaultProps = {
  children: []
};

export default FairyContainer;
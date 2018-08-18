import React from 'react';
import PropTypes from 'prop-types';

const MainContentContainer = (props) => (
  <div className="main-container">
    <div className="main-container-header">
      <p className="title">{props.title}</p>        
      <p className="subtitle">{props.subtitle}</p>   
    </div>
    <div className="main-container-content">
      {props.content}
    </div>
  </div>
  );

MainContentContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.node
}

MainContentContainer.defaultProps = {
  title: "",
  subtitle: "",
  content: []
};

export default MainContentContainer;
import React from 'react';
import PropTypes from 'prop-types';
import { getClasses } from './utils';

const MainContentContainer = (props) => {
  
  const classes = [
    "main-container"
  ];

  if (props.className) {
    classes.push(props.className)
  }

  return (
    <div className={getClasses(classes)} >
      <div className="main-container-header">
        <p className="title">{props.title}</p>        
        <p className="subtitle">{props.subtitle}</p>   
      </div>
      <div className="main-container-content">
        {props.content}
      </div>
    </div>
  );
}

MainContentContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.node,
  className: PropTypes.string
}

MainContentContainer.defaultProps = {
  title: "",
  subtitle: "",
  content: [],
  className: ""
};

export default MainContentContainer;
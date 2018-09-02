import _ from 'lodash';

export const getClasses = (classes) => (_.join(classes, " "));
export const addClassIfProp = (prop, className) => (prop ? className : "");
export const styleObjectToStyleString = (styleObject) => {
  const styleStringsArray = [];
  _.forEach(styleObject, (value,key) => {
    styleStringsArray.push(`${key}:${value}`);
  });

  return _.join(styleStringsArray, ";");
};


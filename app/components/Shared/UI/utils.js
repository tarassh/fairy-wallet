import _ from 'lodash';

export const getClasses = (classes) => (_.join(classes, " "));
export const addClassIfProp = (prop, className) => (prop ? className : "");


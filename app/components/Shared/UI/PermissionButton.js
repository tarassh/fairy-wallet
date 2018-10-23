// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown } from 'semantic-ui-react';
import { getClasses } from './utils';

const PermissionButton = (props) => {
  const classes = [
    "permission-button"
  ]

  if (props.className) {
    classes.push(props.className);
  }

  const permissions = _.map(props.account.permissions, el => ({
    key: el.perm_name,
    value: el.perm_name,
    text: `@${el.perm_name}`
  }));

  return (
    <Button.Group className={getClasses(classes)}>
      <Button content={props.content} disabled={props.disabled} onClick={props.onClick} />
      <Dropdown
        options={permissions}
        floating
        name="permission"
        button
        className="icon permission"
        disabled={props.disabled}
        onChange={props.onChange}
      />
    </Button.Group>
  );

}

PermissionButton.propTypes = {
  content: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  account: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

PermissionButton.defaultProps = {
  content: "",
  disabled: false,
  className: "",
  account: undefined,
  onChange: undefined,
  onClick: undefined
};

export default PermissionButton;
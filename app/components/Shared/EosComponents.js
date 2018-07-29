// @flow
import React from 'react';
import { Form } from 'semantic-ui-react';
import { re } from '../../utils/parser';

const handleAccountNameInputValidationOnChange = (e, v, onChange) => {
  const { value } = v;
  if (value === '' || re.account.test(value)) {
    onChange(e, v);
  }
};

const InputAccount = (props: inputProps) => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input {...props} />;
  }

  const { onChange, ...parentProps } = props;

  return (
    <Form.Input
      {...parentProps}
      onChange={(e, v) =>
        handleAccountNameInputValidationOnChange(e, v, onChange)
      }
    />
  );
};

const handleFloatInputValidationOnChange = (e, v, onChange, onError) => {
  const { value, min, max } = v;
  const number = parseFloat(value);
  const inRange = min <= number && number <= max;
  const isNumber = re.float.test(value);
  if (value === '' || (isNumber && inRange)) {
    onChange(e, v);
  } else {
    onError(e, { isNaN: !isNumber, inRange, ...v });
  }
};

const InputFloat = (props: inputProps) => {
  if (typeof props.onChange !== 'function') {
    return <Form.Input {...props} />;
  }

  const { onChange, onError, ...parentProps } = props;

  return (
    <Form.Input
      {...parentProps}
      onChange={(e, v) =>
        handleFloatInputValidationOnChange(e, v, onChange, onError)
      }
    />
  );
};

export default {
  InputAccount,
  InputFloat
};

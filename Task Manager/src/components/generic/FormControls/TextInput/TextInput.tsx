/* eslint-disable no-nested-ternary */
import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import { Row, Col } from 'react-bootstrap';
import classes from './TextInput.module.css';

export type TextInputProps = React.ComponentPropsWithoutRef<'input'> &
FormControlProps & {
  // icon?: IconDefinition;
  labelName?: React.ReactNode;
  errorMessage?: string;
  isTouched?: boolean;
};
function TextInput({
  type = 'text',
  name,
  labelName,
  placeholder,
  errorMessage,
  isTouched,
  value,
  ...rest
}: TextInputProps) {
  return (
    <Form.Group as={Row}>
      {labelName && <Form.Label className={classes.label} column md="3">{labelName}</Form.Label>}
      <Col sm="8">
        <FormControl
          type={type}
          name={name}
          value={value ?? ''}
          placeholder={placeholder}
        //   className={
        //   isTouched && !errorMessage
        //     ? 'is-valid'
        //     : isTouched && !!errorMessage
        //       ? 'is-invalid'
        //       : undefined
        // }
          {...rest}
        />

        {/* {isTouched && errorMessage && (
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
        )} */}
      </Col>

    </Form.Group>
  );
}

export default TextInput;

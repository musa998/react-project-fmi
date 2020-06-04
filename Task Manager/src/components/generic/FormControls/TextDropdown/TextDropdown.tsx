import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl, { FormControlProps } from 'react-bootstrap/FormControl';
import { Row, Col } from 'react-bootstrap';
import classes from './TextDropdown.module.css';

export type TextDropdownProps = React.ComponentPropsWithoutRef<'select'> &
FormControlProps & {
  array: string[];
  labelName?: React.ReactNode;
  errorMessage?: string;
  isTouched?: boolean;
};
function TextDropdown({
  name,
  labelName,
  array,
  isTouched,
  value,
  ...rest
}: TextDropdownProps) {
  return (
    <Form.Group as={Row}>
      {labelName && <Form.Label className={classes.label} column md="3">{labelName}</Form.Label>}
      <Col>
        <select 
          className="col-sm-10"
          name={name} 
          value={value ?? ''}
          {...rest}
        />
      </Col>
    </Form.Group>
  );
}

export default  TextDropdown; 
import React from 'react';
import { FieldProps, Field } from 'formik';
import TextDropdown, { TextDropdownProps } from '../TextDropdown/TextDropdown';

type Props = FieldProps & TextDropdownProps;

function TextInputField({ array, field, form, ...rest }: Props) {
  return (
    <TextDropdown
      array={array}
      value={field.value}
      name={field.name}
      {...rest}
    >
      {array?.map((d) =>
        <Field component="option" value={d}>{d || 'no content'}</Field>)}
    </TextDropdown>

  );
} 

function TextDropdownWraper(props: TextDropdownProps) {
  return <Field component={TextInputField} {...props} />;
}
export default TextDropdownWraper;
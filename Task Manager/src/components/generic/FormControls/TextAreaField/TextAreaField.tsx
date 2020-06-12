import React from 'react';
import { FieldProps, Field } from 'formik';
import TextInput from '../TextInput';
import { TextInputProps } from '../TextInput/TextInput';

type Props = FieldProps & TextInputProps;

function TextAreaField({ field, form, isTouched, errorMessage, ...rest }: Props) {
  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      errorMessage={errorMessage ?? (form.errors[field.name] as string)}
      isTouched={isTouched ?? !!form.touched[field.name]}
      {...rest}
    />
  );
}
function TextAreaFieldWraper(props: TextInputProps) {
  return <Field component={TextAreaField} {...props} />;
}
 
export default TextAreaFieldWraper;

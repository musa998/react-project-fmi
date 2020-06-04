import React from 'react';
import { FieldProps, Field } from 'formik';
import TextInput from '../TextInput';
import { TextInputProps } from '../TextInput/TextInput';

type Props = FieldProps & TextInputProps;

function TextInputField({ field, form, ...rest }: Props) {
  return (
    <TextInput
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      errorMessage={form.errors[field.name] as string}
      isTouched={!!form.touched[field.name]}
      {...rest}
    />
  );
}
function TextInputWraper(props: TextInputProps) {
  return <Field component={TextInputField} {...props} />;
}

export default TextInputWraper;

import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { debounce } from "throttle-debounce";

import {
 TextField
} from '@material-ui/core';

function NumberFormatCustom(props) {
  const { inputRef, onChange, name, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={ inputRef }
      onValueChange={ values => {
        onChange({ target: { value: values.value, name } });
      }}
      thousandSeparator
    />
  );
}

export class NumberInput extends Component {

  onChangeDebounced = debounce(this.props.debounceTimeout, this.props.onChange);

  render() {
    const { value, id, label, name, style } = this.props;
    return (
      <TextField
        style={ style }
        label={ label }
        value={ value }
        onChange={ this.onChangeDebounced }
        id={ id }
        name={ name }
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    );
  }
}

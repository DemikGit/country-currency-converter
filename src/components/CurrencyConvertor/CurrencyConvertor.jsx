import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as isEmpty from 'lodash.isempty';
import { BigNumber } from 'bignumber.js';

import {
  CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';

import { NumberInput } from '../NumberInput/NumberInput';

import {
  setField,
} from './CurrencyConvertorActions';

import {
  getFirstCurrency,
  getFirstValue,
  getSecondCurrency,
  getSecondValue,
  getLastChanged,
  getSource,
} from './CurrencyConvertorSelectors';

import { getRates } from '../CurrencyList/CurrencyListSelectors';

class CurrencyConvertorComponent extends Component {

  componentDidUpdate = (prevProps) => {
    const {
      firstCurrency, secondCurrency,
      firstValue, secondValue, lastChanged,
      rates, source, setFieldValue
    } = this.props;

    if(!rates.loading.isLoading && rates.loading.success ) {
      if( !isEmpty(firstCurrency) && !isEmpty(secondCurrency) ) {
        if(['firstCurrency', 'firstValue'].includes(lastChanged)) {
          if(!isEmpty(firstValue) ) {
            if(source === 'input') {
              const result = new BigNumber(firstValue).multipliedBy(
                this.recalculateRates(firstCurrency, secondCurrency)
              );
              setFieldValue('secondValue' ,result.toFixed(7), 'code');
            }
          }
        } else {
          if(!isEmpty(secondValue)) {
            if(source === 'input') {
              const result = new BigNumber(secondValue).multipliedBy(
                this.recalculateRates(secondCurrency, firstCurrency)
              );
              setFieldValue('firstValue', result.toFixed(7), 'code');
            }
          }
        }
      }
    }
  };

  onChange = (event) => {
    const { name, value } = event.target;
    this.props.setFieldValue(name, value, 'input');
  };

  renderInput = (name) => {
    return (
      <NumberInput
        style={{ marginBottom: '16px' }}
        id={ name }
        name={ name }
        value={ this.props[name] }
        label="Value"
        debounceTimeout={ 500 }
        onChange={ this.onChange }
      />
    );
  };

  renderSelect = (name) => {
    return (
      <FormControl style={{ marginBottom: '16px' }} >
        {
          false ?
          <CircularProgress style={{ margin: 'auto' }}/>
          :
          <Fragment>
            <InputLabel htmlFor={ name }>Currency</InputLabel>
            <Select
              value={ this.props[name] }
              onChange={ this.onChange }
              inputProps={{
                name,
                id: name,
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              { this.props.availableSymbols.map((currency => (
                <MenuItem key={`${ currency.value + currency.label }`} value={ currency.value }>
                  { currency.label }
                </MenuItem>
              ))) }
            </Select>
          </Fragment>
        }
      </FormControl>
    );
  }

  renderResult = (availableSymbols) => {
    const { firstCurrency, secondCurrency, firstValue, secondValue, lastChanged } = this.props;
    return (
      <Fragment>
        {
          isEmpty(firstCurrency) ||
          isEmpty(secondCurrency) ||
          isEmpty(firstValue) ||
          isEmpty(secondValue) ?
            null
            :
            <Typography align="center" gutterBottom variant="display1">
              {
                !['firstCurrency', 'firstValue'].includes(lastChanged) ?
                  `${
                    firstCurrency } ${ firstValue
                  } === ${
                    secondCurrency} ${ secondValue
                  }`
                  :
                  `${
                    secondCurrency } ${ secondValue
                  } === ${
                    firstCurrency} ${ firstValue
                  }`
              }
            </Typography>
        }
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        <Typography align="left" gutterBottom variant="subheading">
          First
        </Typography>
        { this.renderSelect('firstCurrency') }
        { this.renderInput('firstValue') }
        <Typography align="left" gutterBottom variant="subheading">
          Second
        </Typography>
        { this.renderSelect('secondCurrency') }
        { this.renderInput('secondValue') }
        { this.renderResult(this.props.availableSymbols) }
      </Fragment>
    );
  }

  recalculateRates = (fromCurrency, toCurrency) => {
    const data = this.props.rates.data;
    const fromRate = data.find((rate) => rate.key === fromCurrency);
    const toRate = data.find((rate) => rate.key === toCurrency);

    if(!isEmpty(toRate) && !isEmpty(fromRate)) {
      return (new BigNumber(toRate.value).div(fromRate.value));
    }

    return 1;
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFieldValue: (name, value, source) => dispatch(setField(name, value, source)),
});

const mapStateToProps = (state) => ({
  firstCurrency: getFirstCurrency(state),
  firstValue: getFirstValue(state),
  secondCurrency: getSecondCurrency(state),
  secondValue: getSecondValue(state),
  lastChanged: getLastChanged(state),
  rates: getRates(state),
  source: getSource(state),
});

export const CurrencyConvertor = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyConvertorComponent);

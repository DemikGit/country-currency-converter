import React, { Fragment } from 'react';
import { BigNumber } from 'bignumber.js';
import { connect } from 'react-redux';
import * as isEmpty from 'lodash.isempty';

import {
  Table, TableBody, TableCell, TableHead, TableRow, Checkbox, CircularProgress, Typography
} from '@material-ui/core';

import { loadAllRates } from './CurrencyListActions';
import { getRates } from './CurrencyListSelectors';

import { getAvailableSymbols, getFavoriteCurrencies } from '../App/AppSelectors';
import { toggleFavoriteCurrency } from '../App/AppActions';

const rows = [
  { id: 'from', numeric: false, disablePadding: true, label: 'From' },
  { id: 'first-value', numeric: true, disablePadding: false, label: 'Value' },
  { id: 'dummy', numeric: false, disablePadding: false, label: ' ' },
  { id: 'second-value', numeric: true, disablePadding: false, label: 'Value' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To' },
];

class EnhancedTableHead extends React.Component {
  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                { row.label }
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

class CurrencyListComponent extends React.Component {
  handleClick = (event, id) => {
    this.props.toggleFavorite(id);
  };

  isSelected = id => !!this.props.favorites[id];

  recalculateRates = (data) => {
    const base = data.find((rate) => rate.key === this.props.baseCurrency);

    let newData = isEmpty(base) ?
      data
      :
      data.map(rate => {
        return { key: rate.key, value: (new BigNumber(rate.value).div(base.value)).toFixed(7) }
      })

    return newData;
  }

  orderedRates = () => {
    let { favorites, currencyRates: { data } } = this.props;

    data = this.recalculateRates(data);

    data.sort((a,b) => {
      if(Object.keys(favorites).includes(b.key)) {
        return 1;
      }
      if(Object.keys(favorites).includes(a.key)) {
        return -1;
      }
      return 0;
    });

    return data;
  }

  render() {
    const { baseCurrency, symbols, currencyRates, favorites } = this.props;

    return (
      <Fragment>
        <div style={{ overflow: 'auto', width: '100%', maxHeight: '624px' }}>
          <Table aria-labelledby="tableTitle">
            {
              currencyRates.loading.isLoading ?
                <CircularProgress style={{ margin: 'auto', display: 'block', padding: '1px' }} />
                :
                <Fragment>
                  <EnhancedTableHead
                    numSelected={ Object.keys(favorites).length }
                    onSelectAllClick={ this.handleSelectAllClick }
                    rowCount={ Object.keys(currencyRates.data).length }
                  />
                  <TableBody>
                    {
                      this.orderedRates().map( (rate) => {

                        const isSelected = this.isSelected(rate.key);

                        return (
                          <TableRow
                            hover
                            onClick={event => this.handleClick(event, rate.key)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={ rate.key }
                            selected={isSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox checked={isSelected} />
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">
                              { symbols[baseCurrency] }
                            </TableCell>
                            <TableCell numeric> 1 </TableCell>
                            <TableCell>
                              <Typography align="center">
                                ===
                              </Typography>
                            </TableCell>
                            <TableCell numeric>{ rate.value }</TableCell>
                            <TableCell>{ symbols[rate.key] + `(${rate.key})` }</TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </TableBody>
                </Fragment>
            }
          </Table>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchAllRates: (base) => dispatch(loadAllRates(base)),
  toggleFavorite: (favorite) => dispatch(toggleFavoriteCurrency(favorite))
});

const mapStateToProps = (state) => ({
  currencyRates: getRates(state),
  symbols: getAvailableSymbols(state),
  favorites: getFavoriteCurrencies(state),
});

export const CurrencyList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrencyListComponent);


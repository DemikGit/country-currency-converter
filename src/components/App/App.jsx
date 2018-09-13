import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Grid, CssBaseline, Paper, CircularProgress, Typography,
  BottomNavigation, BottomNavigationAction, Toolbar, FormControl, Select, MenuItem,
  InputLabel
} from '@material-ui/core';

import { ViewList as ViewListIcon, CompareArrows as CompareArrowsIcon} from '@material-ui/icons';

import { loadUserLocation, loadAvailableSymbols, setBaseCurrency } from './AppActions';
import { getUserGeoData, getUserBaseCurrency, getAvailableSymbolsOptions } from './AppSelectors';

import { loadAllRates } from '../CurrencyList/CurrencyListActions';

import { CurrencyConvertor } from '../CurrencyConvertor/CurrencyConvertor';
import { CurrencyList } from '../CurrencyList/CurrencyList';

import { countryCurrencyCodes } from '../../utils/ISOCodes';

class AppComponent extends Component {

  handleChange = (event, value) => {
    this.props.history.push(value);
  };

  componentDidMount = () => {
    if(this.props.baseCurrency === '') {
      this.props.fetchUserLocation();
    }
    this.props.fetchAvailableSymbols();
    this.props.fetchAllRates();
  }

  componentDidUpdate = () => {
    const { baseCurrency, setUserBaseCurrency, userLocation } = this.props;

    if( baseCurrency === '' && (!userLocation.loading.isLoading && userLocation.loading.success)) {
      setUserBaseCurrency(countryCurrencyCodes[userLocation.data.country]);
    }
  }

  onChange = (event) => {
    this.props.setUserBaseCurrency(event.target.value);
  }

  renderSelect = (name) => {
    return (
      <FormControl style={{ width: '150px', marginLeft: 'auto', marginBottom: '16px' }} >
        {
          this.props.userLocation.loading.isLoading ?
          <CircularProgress style={{ margin: 'auto' }}/>
          :
          <Fragment>
            <InputLabel htmlFor={ name }>Base Currency</InputLabel>
            <Select
              value={ this.props.baseCurrency }
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
                <MenuItem key={ currency.value + '-' + currency.label } value={ currency.value }>
                  { currency.label }
                </MenuItem>
              ))) }
            </Select>
          </Fragment>
        }
      </FormControl>
    );
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <Grid container justify="center" style={{ padding: '54px' }}>
          <Grid item xs={ 8 }>
            <Typography style={{ marginBottom: '38px' }} variant="title">
              Country Currency Convertor
            </Typography>
          </Grid>
          <Grid container justify="center" spacing={ 16 }>
            <Grid item xs={ 8 }>
              <Paper style={{ padding: '24px', paddingBottom: 'unset', maxHeight: '768px' }}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                >
                  <Toolbar>
                    { this.renderSelect() }
                  </Toolbar>
                  <Switch>
                    <Route
                      exact
                      path="/currencies"
                      render={ props => (
                        <CurrencyList
                          {...props}
                          availableSymbols={ this.props.availableSymbols }
                          baseCurrency={ this.props.baseCurrency }
                      />)
                      }
                    />
                    <Route
                      path="/"
                      render={ props => (
                        <CurrencyConvertor
                          {...props}
                          availableSymbols={ this.props.availableSymbols }
                      />)
                      }
                    />
                  </Switch>
                  <BottomNavigation
                    value={ this.props.location.pathname }
                    onChange={ this.handleChange }
                  >
                    <BottomNavigationAction
                      label="Convertor"
                      value="/"
                      icon={<CompareArrowsIcon />}
                    />countryCurrencyCodes
                    <BottomNavigationAction
                      label="Rates"
                      value="/currencies"
                      icon={ <ViewListIcon /> }
                    />
                  </BottomNavigation>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchUserLocation: () => dispatch(loadUserLocation()),
  fetchAvailableSymbols: () => dispatch(loadAvailableSymbols()),
  setUserBaseCurrency: (symbol) => dispatch(setBaseCurrency(symbol)),
  fetchAllRates: () => dispatch(loadAllRates())
});

const mapStateToProps = (state) => ({
  userLocation: getUserGeoData(state),
  baseCurrency: getUserBaseCurrency(state),
  availableSymbols: getAvailableSymbolsOptions(state),
});

export const App = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent));

export const fetchSymbols = () => {
  return (
    fetch(
      `https://openexchangerates.org/api/currencies.json?prettyprint=true&show_alternative=false&show_inactive=false&app_id=a8050074707d480bb75dabbc4d77f446`,
    ).then((response) => response.json())
  );
}

export const fetchAllRates = () => {
  return (
    fetch(
      `https://openexchangerates.org/api/latest.json?app_id=a8050074707d480bb75dabbc4d77f446`,
      { cache: 'no-store' }
    ).then((response) => response.json())
  );
}

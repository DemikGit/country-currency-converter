export const fetchGeoLocation = () => {
  return (
    fetch(
      'http://ipinfo.io?token=2b93c06e42ddb3',
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    ).then((response) => response.json())
  );
}

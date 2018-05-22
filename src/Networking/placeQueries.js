export const getPlacesJSON = (placeURL) => {
    return fetch(placeURL)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log("response results: " + responseJson.results);
            return responseJson.results;
        })
        .catch((error) => {
            console.error(error);
        });
};

/*
function getMoviesFromApiAsync() {
  return fetch('https://facebook.github.io/react-native/movies.json')
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}

console.log("pharm url: "+pharmUrl);
        console.log("hospital url: "+hospitalUrl);
        getPlacesJSON(pharmUrl)
        .then(pharmRes => {
          getPlacesJSON(hospitalUrl)
          .then(hospitalRes => {
            let allData = hospitalRes + "," + pharmRes;
            console.log("all data: " + allData);
            this.setState({
              isLoading: false,
              dataSource: allData,
            }, function () {
            });
          });
        });

this.setState({
              isLoading: false,
              dataSource: responseJson.results,
            }, function () {
            });
*/
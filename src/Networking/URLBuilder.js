export default function  URLBuild (latitude, longitude, type) {
    let beginning = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
    let url = beginning+latitude+','+longitude+'&keyword='+type+'&opennow&radius=2000&type='+type+'&key=AIzaSyCfqPwK_RSYFiHdV97Pedp3CpkV3wj0aO4';
    return url;
  }
  
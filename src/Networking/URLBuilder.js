export default function  URLBuild (latitude, longitude) {
    let beginning = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
    let url = beginning+latitude+','+longitude+'&radius=2000&type=hospital&keyword=pharmacy&key=AIzaSyCfqPwK_RSYFiHdV97Pedp3CpkV3wj0aO4';
    return url;
  }
  
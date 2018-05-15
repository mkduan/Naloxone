import React from 'react';
import { TouchableHighlight, Dimensions, ActivityIndicator, View } from 'react-native';
import { MapView } from 'expo';
import { Circle } from 'react-native-maps';
import RetroMapStyles from '../Style/RetroMapStyles.json';
import URLBuild from '../Networking/URLBuilder';
import openGps from '../Networking/openGPS';
import { Ionicons } from '@expo/vector-icons';
import styles from '../Style/Style.js';
import MarkerCallout from '../Components/MarkerCallout.js'

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 45.5017;
const LONGITUDE = -73.5673;
const LATITUDE_DELTA = 0.0922 / 1.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO / 1.5;

export default class MapScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isLoading: true,
      circle: {
        center: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        radius: 2000,
      },
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          circle: {
            center: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            radius: 2000,

          },
        });
        let lat = this.state.region.latitude;
        let long = this.state.region.longitude;
        //TODO: Maybe change the raduis dynamically?
        let url = URLBuild(lat, long);
        console.log(url);
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSource: responseJson.results,
            }, function () {
            });
          })
          .catch((error) => {
            console.error(error);
          });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 },
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <MapView
          style={{ flex: 1 }}
          customMapStyle={RetroMapStyles}
          region={this.state.region}
        />
      )
    }

    return (
      <MapView
        style={{ flex: 1 }}
        customMapStyle={RetroMapStyles}
        region={this.state.region}
      >
        <Circle
          center={this.state.circle.center}
          radius={this.state.circle.radius}
          fillColor="rgba(0, 132, 255, 0.125)"
          strokeColor="rgba(0,0,0,0.5)"
          zIndex={2}
          strokeWidth={2}
        />
        <MapView.Marker
          coordinate={this.state.region}
        />
        {this.state.dataSource.map(marker => (
          <MapView.Marker
            coordinate={{
              latitude: marker.geometry.location.lat,
              longitude: marker.geometry.location.lng,
            }}//TODO:: Callout customize the dialog
            key={marker.id}
            title={marker.name}
            description={marker.vicinity}
            image={marker.icon}
            onCalloutPress={() => {
              openGps(marker.geometry.location.lat, marker.geometry.location.lng);
            }}
          >
            <MapView.Callout width={140} height={70} >
              <TouchableHighlight
                underlayColor="transparent"
              >
                <MarkerCallout
                  title = {marker.name}
                  address = {marker.vicinity}
                />
              </TouchableHighlight>
            </MapView.Callout>
          </MapView.Marker>
        ))}
      </MapView>
    );
  }
}
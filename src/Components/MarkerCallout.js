import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../Style/Style.js';

class MarkerCallout extends Component{
    render() {
        const{title, address} = this.props;
        
        return (
            <View style = {styles.markerCallout}>
                <Text style = {styles.markerTitle}
                    numberOfLines = {1}>
                    {title}
                </Text>
                <Text style = {styles.markerAddress}
                    numberOfLines={2}>
                    {address}
                </Text>
            </View>
        );
    }
}

MarkerCallout.propTypes = {
    title: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
};

export default MarkerCallout;
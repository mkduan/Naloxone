import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../Style/Style.js';

class SettingHeader extends Component{
    render() {
        const{title} = this.props;
        
        return (
            <View style = {styles.settingHeader}>
                <Text style = {styles.settingHeaderTitle}>
                    {title}
                </Text>
            </View>
        );
    }
}

SettingHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default SettingHeader;
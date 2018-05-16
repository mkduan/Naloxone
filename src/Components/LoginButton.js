import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Text, TouchableHighlight} from 'react-native';
//import styles from '../Style/Style.js';
import { Ionicons } from '@expo/vector-icons';

class LoginButton extends Component{
    render() {
        const{login, color, icon, loginText} = this.props;
        
        return (
            <TouchableHighlight
                style={{
                    backgroundColor: color,
                }}
                onPress={login}
            >
                <Text style = {{color: "white", alignItems: 'center', padding: 10}}> {loginText} </Text>
            </TouchableHighlight>
        );
    }
}

LoginButton.propTypes = {
    login: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    loginText: PropTypes.string.isRequired,
};

export default LoginButton;
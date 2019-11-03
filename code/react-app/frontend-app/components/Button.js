import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles/styles';


var Button = (props) => {
    return (
        <TouchableOpacity style={styles.button}>
            {/* <FontAwesome name="th-large" size={25} color="#c3c3c3" /> */}
            <Text style={styles.textBtn}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export { Button }
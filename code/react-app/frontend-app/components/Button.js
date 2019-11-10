import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../styles/styles';


var Button = (props) => {
    const isSelected = props.id === props.currentBtn;
    const bgColor = isSelected ? '#ffa100' : "#FFE399";
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: bgColor }]}
            onPress={() => {
                props.setTabCurrent(props.id);
            }}>
            {/* <FontAwesome name="th-large" size={25} color="#c3c3c3" /> */}
            <Text style={styles.textBtn}>{props.text}</Text>
        </TouchableOpacity>
    );
}

export { Button }
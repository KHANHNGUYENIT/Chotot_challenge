import React from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
  } from 'react-native';
  import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

  import {styles} from '../styles/styles';

const Search = props => {
    return (
      <View style={styles.contain_search}>
        <Text style={styles.logo}>Chợ Tốt</Text>
        <TextInput style={styles.input_search} placeholder="Search..." />
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="shopping-bag" size={27} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

export {Search}
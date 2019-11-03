import React from 'react';
import { Image ,View,Text} from 'react-native';
import { styles } from '../styles/styles';

const renderList = ({ item }) => {
    return (
        <View style={styles.containItem}>
            <Image style={styles.image} source={item.ImageUrl}></Image>
            <Text style={styles.itemName} numberOfLines={2} ellipsizeMode={"tail"}>{item.ItemName}</Text>
            <Text style = {styles.itemPrice}>{item.Price}</Text>
        </View>
    )

}
export { renderList }
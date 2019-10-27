import React from 'react';
import { ScrollView, StyleSheet , Text} from 'react-native';

export default class CategoryScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Danh mục</Text>
      </ScrollView>
    );
  }
}

CategoryScreen.navigationOptions = {
  title: 'Danh mục',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

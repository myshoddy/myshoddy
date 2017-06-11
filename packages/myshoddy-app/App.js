import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {GRAPHQL_API} from './config.json';

export default class App extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch(GRAPHQL_API, {method: 'POST'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          message: responseJson.message,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
        <Text>is loading</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

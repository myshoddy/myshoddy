import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {graphqlApi} from './config.json';
import Expo from 'expo'
import Login from './Login';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
    });

    this.setState({isReady: true});
  }

  /*componentDidMount() {
    return fetch(graphqlApi, {method: 'POST'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          message: responseJson.message,
        }, function () {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }*/

  render() {
    if (!this.state.isReady) {
      return (
        <Expo.AppLoading />
      );
    }

    if (!this.state.authInfo) {
      return (
        <Login onLoggedIn={authInfo => this.setState({authInfo})}/>
      )
    }

    return (
      <View style={styles.container}>
        <Text>Wilkommen {this.state.authInfo.username}!</Text>
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

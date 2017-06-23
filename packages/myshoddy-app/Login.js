import React from 'react';
import { StyleSheet, Linking, View, Dimensions } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import jwtDecoder from 'jwt-decode'
import config from './config.json';
import Expo from 'expo'

export default class Login extends React.Component {
  componentDidMount() {
    // handle redirects after auth0 authentication
    Linking.addEventListener('url', this._handleAuth0Redirect)
  }

  render() {
    const {height: screenHeight} = Dimensions.get('window');

    return (
      <Container>
        <Content padder>
          <View style={{ flex: 1, height: screenHeight, justifyContent: 'center' }}>
            <Button block success onPress={this._loginWithAuth0}>
              <Text>Login</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }

  _loginWithAuth0 = async () => {
    let redirect_uri;
    if (Expo.Constants.manifest.xde) {
      // replace `<Expo URL without Port>` with the app's URL when you open it in Expo
      // without the colon and the port
      redirect_uri = config.auth0.redirectUrl;
    } else {
      // this URL will be used when you publish your app
      redirect_uri = `${Expo.Constants.linkingUri}/redirect`
    }

    // replace `<Domain>` with your Auth0 Domain
    const authorize_url = config.auth0.authorizeUrl;

    const auth0_client_id = config.auth0.clientId;

    const redirectionURL = authorize_url + this._toQueryString({
      client_id: auth0_client_id,
      response_type: 'token',
      scope: 'openid name',
      redirect_uri,
      state: redirect_uri,
    });
    Expo.WebBrowser.openBrowserAsync(redirectionURL)
  };

  _handleAuth0Redirect = async (event) => {
    if (!event.url.includes('+/redirect')) {
      return;
    }

    Expo.WebBrowser.dismissBrowser();
    const [, queryString] = event.url.split('#');
    const responseObj = queryString.split('&').reduce((map, pair) => {
      const [key, value] = pair.split('=');
      map[key] = value; // eslint-disable-line
      return map
    }, {});

    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    const username = decodedToken.name;

    this.props.onLoggedIn({
      username: username,
    });
  }

  _toQueryString(params) {
    return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }
}

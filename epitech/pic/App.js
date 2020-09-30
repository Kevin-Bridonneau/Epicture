/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useCallback, useMemo } from 'react';
import { UIManager, Alert } from 'react-native';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { 
  authorize, refresh,
   revoke
   , prefetchConfiguration 
} from 'react-native-app-auth';

const configs = {
  imgur: {
    issuer: 'https://api.imgur.com/oauth2/',
    serviceConfiguration:{
      authorizationEndpoint:'https://api.imgur.com/oauth2/authorize?client_id=95763a084518376&response_type=token',
      tokenEndpoint:'https://imgur.com/'
    },
    clientId: '95763a084518376',
    clientSecret:'8e8a31d9b07858796239a5b1818dc47d7a21a7b6',
    redirectUrl: 'com.pic://com.pic'
  },
};

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

const App: () => React$Node = () => {
  const [authState, setAuthState] = useState(defaultAuthState);
  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      ...configs.identityserver
    });
  }, []);
  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
        const newAuthState = await authorize(config);
       setAuthState({
         hasLoggedInOnce: true,
         provider: provider,
         ...newAuthState
        });
      } catch (error) {
        Alert.alert('Failed to log in', error.message);
      }
    },
    [authState]
  );
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          onPress={() => handleAuthorize('imgur')}
          title="Login To Imgur"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

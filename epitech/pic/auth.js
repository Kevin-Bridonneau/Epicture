import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://api.imgur.com/oauth2/',
  clientId: 'ffea18b10c6e973',
  redirectUrl: 'https://imgur.com/',
  scopes: ['account_username','account_id'],
};

// use the client to make the auth request and receive the authState
try {
    const result = await authorize(config);
    // result includes accessToken, accessTokenExpirationDate and refreshToken
  } catch (error) {
    console.log(error);
}
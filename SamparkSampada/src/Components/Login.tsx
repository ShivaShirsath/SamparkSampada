import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';

function Login(): JSX.Element {
  return (
    <View style={{
      borderColor: 'red',
      borderWidth: 2.5,
      borderRadius: 12.5,
      padding: 25,
      gap: 25,
      alignContent: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        textAlign: 'center'
      }}>Login Screen</Text>
      <Button title='Login' />
    </View>
  );
}

export default Login;

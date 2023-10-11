import {View, Text, Button, Alert} from 'react-native';
import React from 'react';
import {useColorScheme} from 'react-native';

const Home = ({navigation, route}: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'black' : 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderWidth: 2.5,
        borderColor: 'red',
      }}>
      <Text>
        Hello {route.params.name} !
      </Text>
      <Button title="Navigate" onPress={() => navigation.navigate('User')} />
    </View>
  );
};

export default Home;

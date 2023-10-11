/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, Text, Button, useColorScheme, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import User from './src/Screens/User';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTitleStyle: {
            fontWeight: '900',
          },
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="User"
          component={User}
          options={{
            headerTitle: () => <Button title="Left" onPress={() => {}} />,
            headerRight: () => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput>Hello</TextInput>
                <Button title="Search" onPress={() => {}} />
              </View>
            ),
            title: 'User Entry',
            headerStyle: {
              backgroundColor: 'orange',
            },
          }}
        />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

import {View, Text, Button, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {useColorScheme} from 'react-native';

const User = ({navigation}: any) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? 'black' : 'white',
      }}>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} />
      <Button
        title="Navigate"
        onPress={() => navigation.navigate('Home', {name})}
      />
    </View>
  );
};

export default User;

import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

function Login(): JSX.Element {
  const [phone, setPhone] = useState('');
  const [isWait, setIsWait] = useState(true);
  const [otp, setOTP] = useState({
    '0': '',
    '1': '',
    '2': '',
    '3': '',
    '4': '',
    '5': '',
  });
  const onInputPassword = text => {
    setPhone(text);
  };
  const onOtpChange = (text) => {
    setOTP({...otp, [0]:text});
  };

  return (
    <View
      style={{
        borderColor: 'red',
        borderWidth: 2.5,
        borderRadius: 12.5,
        padding: 25,
        gap: 25,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          gap: 2.5,
        }}>
        <TextInput
          style={{
            flex: 0.2,
            marginTop: 5,
          }}
          editable={false}
          mode="outlined"
          value="+91"
        />
        <TextInput
          style={{
            flex: 0.8,
          }}
          label="Phone Number"
          value={phone}
          mode="outlined"
          placeholder={' 10 Digit Number'}
          keyboardType={'number-pad'}
          onChange={onInputPassword}
        />
      </View>
      <View
        style={{
          display: isWait ? 'flex' : 'none',
          flexDirection: 'row',
          alignContent: 'center',
          gap: 2.5,
        }}>
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[0]}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[1]}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[2]}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[3]}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[4]}
          keyboardType={'number-pad'}
        />
        <TextInput
          style={styles.otp}
          onChange={text => onOtpChange(text)}
          mode="outlined"
          value={otp[5]}
          keyboardType={'number-pad'}
        />
      </View>
      <Button
        disabled={isWait}
        title="Login"
        onPress={() => setIsWait(!isWait)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  otp: {
    flex: 16.66,
    marginTop: 5,
    alignContent: 'center',
  },
});

export default Login;

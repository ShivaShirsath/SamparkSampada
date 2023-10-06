import React, {useEffect, useState} from 'react';
import {Button, Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';

function Login(): JSX.Element {
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const [confirm, setConfirm] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser(null);
      }
    });
    return () => {
      subscriber(); // unsubscribe on unmount
    };
  }, []);

  useEffect(() => {
    let countdownTimer:any;

    if (countdown > 0 && loading) {
      countdownTimer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0 && loading) {
      clearInterval(countdownTimer);
      setLoading(false);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [countdown, loading]);

  const sendOTP = async () => {
    setIsReady(false);
    setLoading(true);
    setCountdown(30);

    try {
      const confirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      setConfirm(confirmation);
      console.log(confirmation);
      setIsReady(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    try {
      const isConfirm = await confirm.confirm(otp);
      console.log('OTP confirmed', isConfirm);
      // Disable the phone input and OTP input after successful confirmation
      setPhone('');
      setOTP('');
      setIsReady(false);
    } catch (error) {
      console.error('Error confirming OTP:', error);
    }
  };

  const handleSignOut = async () => {
    await auth().signOut();
    setLoggedInUser(null);
  };

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <>
          <Text>User: {JSON.stringify(loggedInUser, undefined, 2)}</Text>
          <Button title="Logout" onPress={handleSignOut} />
        </>
      ) : (
        <>
          <View style={styles.phoneInputContainer}>
            <PhoneInput
              defaultValue={phone}
              defaultCode="IN"
              layout="first"
              onChangeText={text => {
                setPhone(text);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            {phone.length === 10 && (
              <>
                <Button
                  title={`Send OTP${
                    countdown === 0 || countdown === 30
                      ? ''
                      : ' (' + countdown + 's)'
                  }`}
                  onPress={sendOTP}
                  disabled={loading}
                />
                {loading && (
                  <ActivityIndicator
                    style={styles.activityIndicator}
                    size="small"
                    color="blue"
                  />
                )}
              </>
            )}
          </View>
          {isReady ? (
            <>
              <OtpInput
                numberOfDigits={6}
                focusColor="green"
                onTextChange={setOTP}
              />
              <Button
                title="Login"
                disabled={!(otp.length === 6)}
                onPress={confirmCode}
              />
            </>
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneInputContainer: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator: {
    marginLeft: 10,
  },
});

export default Login;

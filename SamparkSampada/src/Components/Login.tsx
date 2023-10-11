import React, {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '663564717207-n9g8phef4eoe4tnuadn8rr990cf33i4j.apps.googleusercontent.com',
});

import {
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  ScrollView
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import auth from '@react-native-firebase/auth';
import PhoneInput from 'react-native-phone-number-input';
import MarketValidationForm from './MarketValidationForm';

function Login(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isDisbaleLinkBtn, setIsDisbaleLinkBtn] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const [confirm, setConfirm] = useState(null);
  const [isWaitForConfirm, setIsWaitForConfirm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const onGoogleLinkButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the user ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Link the user with the credential
    const firebaseUserCredential = await auth().currentUser?.linkWithCredential(
      googleCredential,
    );

    return firebaseUserCredential;
  };

  const mergeObjects = (data: any) => {
    return data.reduce((mergedObject: any, obj: any) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (!mergedObject[key]) {
            mergedObject[key] = value;
          } else if (mergedObject[key] !== value) {
            if (Array.isArray(mergedObject[key])) {
              mergedObject[key].push(value);
            } else {
              mergedObject[key] = [mergedObject[key], value];
            }
          }
        }
      });
      return mergedObject;
    }, {});
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setLoggedInUser(user);
        console.log('DDD', mergeObjects(user.providerData));

        setUserData(mergeObjects(auth().currentUser?.providerData));
      } else {
        setLoggedInUser(null);
      }
    });
    setPhone('');
    setOTP('');
    return () => {
      subscriber(); // unsubscribe on unmount
    };
  }, []);

  useEffect(() => {
    let countdownTimer: any;

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
    setIsWaitForConfirm(true);
    try {
      const isConfirm = await confirm.confirm(otp);
      console.log('OTP confirmed', isConfirm);
      setIsReady(false);
      if (
        !auth().currentUser?.providerId?.includes('google.com') ||
        auth().currentUser?.providerId === 'phone'
      ) {
        onGoogleLinkButtonPress();
        setInterval(() => {
          setUserData(mergeObjects(auth().currentUser?.providerData));
        }, 1000);
      }
    } catch (error) {
      console.error('Error confirming OTP:', error);
    }
    setIsWaitForConfirm(false);
  };

  const handleSignOut = async () => {
    await auth().signOut();
  };
  useEffect(() => {
    if (otp.length === 6) {
      confirmCode();
    }
  }, [otp]);
  return (
    <View
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          padding: 25,
          backgroundColor: isDarkMode ? 'black' : 'white',
        },
      ]}>
      {loggedInUser ? (
        <>
          {userData && userData.providerId.includes('google.com') && (
            <>
              <Image
                source={{uri: userData.photoURL}}
                style={{width: 75, aspectRatio: 1, borderRadius: 25}}
              />
              <View
                style={{
                  height: 25,
                }}></View>
              {userData?.displayName && (
                <Text>Hello, {userData?.displayName} !</Text>
              )}
              {userData?.providerId && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Text>Linked with :</Text>
                  <View
                    style={{
                      marginStart: 10,
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                        transform: 'rotate(30deg)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                        transform: 'rotate(60deg)',
                      }}></View>
                    <Text
                      style={{
                        position: 'absolute',
                        top: 0,
                        padding: 1,
                        transform: 'scale(0.8)',
                      }}>
                      ✓
                    </Text>
                    <Text
                      style={{
                        marginStart: 20,
                      }}>
                      {userData?.providerId[0].replace('.com', '')}
                    </Text>
                  </View>
                  <Text> ,</Text>
                  <View
                    style={{
                      marginStart: 10,
                      position: 'relative',
                    }}>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                        transform: 'rotate(30deg)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: 'green',
                        width: 12,
                        height: 12,
                        position: 'absolute',
                        top: 5,
                        transform: 'rotate(60deg)',
                      }}></View>
                    <Text
                      style={{
                        position: 'absolute',
                        top: 0,
                        padding: 1,
                        transform: 'scale(0.8)',
                      }}>
                      ✓
                    </Text>
                    <Text
                      style={{
                        marginStart: 20,
                      }}>
                      {userData?.providerId[1].replace('.com', '')}
                    </Text>
                  </View>
                </View>
              )}
              {userData?.email && <Text>Email ID : {userData?.email}</Text>}
              {userData?.phoneNumber && (
                <Text>Phone Number : {userData?.phoneNumber}</Text>
              )}
              <View
                style={{
                  height: 25,
                }}></View>
              <Button title="Logout" onPress={handleSignOut} />
              <ScrollView>
                {/* <MarketValidationForm /> */}
              </ScrollView>
            </>
          )}
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
                title={'Login' + (loggedInUser ? '' : ' (' + countdown + 's)')}
                disabled={!(otp.length === 6) || isWaitForConfirm}
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

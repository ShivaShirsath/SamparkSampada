import React from 'react';
import {Button, Image, ScrollView, Text, View} from 'react-native';

import auth from '@react-native-firebase/auth';

const Dashboard = (): JSX.Element => {
  const handleSignOut = async () => {
    await auth().signOut();
  };
  return (
    <View style={{flex: 1}}>
      {auth().currentUser ? (
        <>
          {auth().currentUser &&
            // auth().currentUser.providerId.includes('google.com')
            true && (
              <>
                <Image
                  source={{uri: auth().currentUser.photoURL}}
                  style={{
                    width: 75,
                    height: 75,
                    aspectRatio: 1,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: 'red',
                  }}
                />
                <View
                  style={{
                    height: 25,
                  }}></View>
                {auth().currentUser?.displayName && (
                  <Text>Hello, {auth().currentUser?.displayName} !</Text>
                )}
                {auth().currentUser?.providerId && (
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
                        {auth().currentUser?.providerId[0].replace('.com', '')}
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
                        {auth().currentUser?.providerId[1].replace('.com', '')}
                      </Text>
                    </View>
                  </View>
                )}
                {auth().currentUser?.email && (
                  <Text>Email ID : {auth().currentUser?.email}</Text>
                )}
                {auth().currentUser?.phoneNumber && (
                  <Text>Phone Number : {auth().currentUser?.phoneNumber}</Text>
                )}
                <View
                  style={{
                    height: 25,
                  }}></View>
                <Button title="Logout" onPress={handleSignOut} />
                <ScrollView>
                  {/* <MarketValidationForm /> */}
                  <Text>
                    {JSON.stringify(auth().currentUser, undefined, 2)}
                  </Text>
                </ScrollView>
              </>
            )}
        </>
      ) : null}
    </View>
  );
};

export default Dashboard;

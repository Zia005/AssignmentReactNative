// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({route, navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const {name,password } = route.params;


  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      navigation.replace('Jokes');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome {name}</Text>
      <Text>Your Password is {password}</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    fontSize : 20,
  },
});

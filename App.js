import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert,BackHandler} from 'react-native';
// import { Icon } from 'antd'
// import { Icon } from 'react-native-eva-icons';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';
import WelcomeScreen from './Screen/WelcomeScreen';
import RegisterScreen from './Screen/RegisterScreen';
import ShowJokesScreen from './Screen/Jokes/ShowJokesScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QueryJokesScreen from './Screen/Jokes/QueryJokesScreen';


const Stack = createStackNavigator();

const Auth = ()=> {
  return (
    <Stack.Navigator initialRouteName='LoginScreen'>
      <Stack.Screen
        name='LoginScreen'
        component={LoginScreen}
        options={
          {headerShown:false}
        }
      />
      <Stack.Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={
          {
            title:"Register",
            headerStyle: {
              backgroundColor: '#307ecc',
            },
            headerTintColor: '#fff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }
        }
      />
      <Stack.Screen
        name='WelcomeScreen'
        component={WelcomeScreen}
        options={
          {headerShown:false}
        }
      />
    </Stack.Navigator>
  );
};

const Jokes = (props,navigation)=> {
  return (
    <Stack.Navigator initialRouteName='QueryJokesScreen'>
      <Stack.Screen
        name='QueryJokesScreen'
        component={QueryJokesScreen}
        options={
          {
            headerLeft: ()=> (
              // <Icon name="chevron-left"
              //   onPress={() => navigation.goBack(null)}
              //   size={35} color="white"/>
              <TouchableOpacity
                // style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress = {
                  ()=> {
                    // navigation.goBack()
                    Alert.alert(
                      'Exit App',
                      'Exiting the application?', [{
                          text: 'Cancel',
                          onPress: () => {return null},
                          style: 'cancel'
                      }, {
                          text: 'OK',
                          onPress: () => BackHandler.exitApp()
                      }, ], {
                          cancelable: false
                      }
                   )
                  }
                }>
                <Text style={{color: '#d8d8d8'}}> Back </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                // style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress = {
                  ()=> {
                    Alert.alert(
                      'Logout',
                      'Are you sure? You want to logout?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: 'Confirm',
                          onPress: () => {
                            // AsyncStorage.clear();
                            props.navigation.replace('Auth');
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                }>
                <Text style={{color: '#d8d8d8'}}> Logout </Text>
              </TouchableOpacity>
              // <Button
              //   onPress={() => alert('This is a button!')}
              //   title="Info"
              //   color="#fff"
              // />
            ),
            headerShown:true,
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }
        }
      />
      <Stack.Screen
        name='ShowJokesScreen'
        component={ShowJokesScreen}
        options={
          {
            headerLeft: ()=> (
              // <Icon name="chevron-left"
              //   onPress={() => navigation.goBack(null)}
              //   size={35} color="white"/>
              <TouchableOpacity
                // style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress = {
                  ()=> {
                    // navigation.goBack();
                    // navigation.navigate('QueryJokesScreen')
                    props.navigation.goBack(null);
                  }
                }>
                <Text style={{color: '#d8d8d8'}}> Back </Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                // style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress = {
                  ()=> {
                    Alert.alert(
                      'Logout',
                      'Are you sure? You want to logout?',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => {
                            return null;
                          },
                        },
                        {
                          text: 'Confirm',
                          onPress: () => {
                            // AsyncStorage.clear();
                            props.navigation.replace('Auth');
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                }>
                <Text style={{color: '#d8d8d8'}}> Logout </Text>
              </TouchableOpacity>
              // <Button
              //   onPress={() => alert('This is a button!')}
              //   title="Info"
              //   color="#fff"
              // />
            ),
            headerShown:true,
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }
        }
      />
  
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen
          name='SplashScreen'
          component={SplashScreen}
          options={
            {headerShown:false}
          }
        />
        <Stack.Screen
          name='Auth'
          component={Auth}
          options={
            {headerShown:false}
          }
        />
        <Stack.Screen
          name='Jokes'
          component={Jokes}
          options={
            {headerShown:false}
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

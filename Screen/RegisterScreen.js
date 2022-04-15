import React, {useState,useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';

const RegisterScreen = (props) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isRegistrationSuccess,setIsRegistrationSuccess] = useState(false);

  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const [animating, setAnimating] = useState(true);

  const handleSubmitButton = async() => {
    setErrorText('');
    if (!userName) {
      alert('Name can\'t be empty');
      return;
    }else {
      if(userName.length < 3){
        alert('Username should be at least 3 characters long');
        return;
      }
    }

    if (!userEmail) {
      alert('Email can\'t be empty');
      return;
    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (reg.test(userEmail) === false) {
        alert('Email Format is not correct. You should check this format "developer.ziakhan@gmail.com" ');
        return;
      }
    }

    if (!userPassword) {
      alert('Password can\'t be empty');
      return;
    } else {
      if(userPassword.length < 8){
        alert('Password should be at least 8 characters long');
        return;
      }
    }

    try {
      setLoading(true);
      if(userName && userEmail && userPassword) {
        setLoading(false);
        // setIsRegistrationSuccess(true);
        await AsyncStorage.setItem('userName', userName);
        await AsyncStorage.setItem('userEmail', userEmail);
        await AsyncStorage.setItem('userPassword', userPassword);
        
        props.navigation.navigate('LoginScreen');
      } else {
        setErrorText("Please check your username, email or password");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  if (isRegistrationSuccess) {
    useEffect(() => {
      setTimeout(() => {
        setAnimating(false);
        //Check if user_id is set or not
        //If not then send for Authentication
        //else send to Home Screen
        props.navigation.navigate('LoginScreen');
      }, 3000);
    }, []);
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center'
          }}
        />
        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#307ecc'}}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../Image/about.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Your Name"
              placeholderTextColor="#ffff11"
              autoCapitalize="none"
              // autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Your Email"
              placeholderTextColor="#ffff11"
              autoCapitalize="none"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Your Password"
              placeholderTextColor="#ffff11"
              autoCapitalize="none"
              onSubmitEditing={Keyboard.dismiss}
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              blurOnSubmit={false}
            />
          </View>
          {errorText != '' ? (
            <Text style={styles.errorTextStyle}>
              {errorText}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});
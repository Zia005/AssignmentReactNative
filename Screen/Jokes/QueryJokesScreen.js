// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {Component, useEffect, useState } from 'react';
import {View, Text, SafeAreaView, Button, Picker, TouchableOpacity,StyleSheet,TextInput,} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import NumberPlease from "react-native-number-please";


export default QueryJokesScreen =  ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState("Select One");
  const [selectedLanguage, setSelectedLanguage] = useState("Select One");


  // const initialValues = [{ id: 'pizza', value: 3 }];
  // const [pizzas, setPizzas] = useState(initialValues);
  // const pizzaNumbers = [{ id: 'pizza', label: '🍕', min: 1, max: 99 }];

//Select Category
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("null");
  const [items, setItems] = useState([
    {label: 'Programming', value: 'programming',selected: true},
    {label: 'Misc', value: 'misc'},
    {label: 'Dark', value: 'dark'},
    {label: 'Pun', value: 'pun'},
    {label: 'Spooky', value: 'spooky'},
    {label: 'Christmas', value: 'christmas'},
    {label: 'Any', value: 'any'},
  ]);

  //Select Language
  const [language, setLanguage] = useState('');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageValue, setLanguageValue] = useState(null);
  const [languageItems, setLanguageItems] = useState([
    {label: 'en - English', value: 'en'},
    {label: 'de - German', value: 'de'},
    {label: 'cs - Czech', value: 'cs'},
    {label: 'es - Spanish', value: 'es'},
    {label: 'fr - French', value: 'fr'},
    {label: 'pt - Portuguese', value: 'pt'},
  ]);

  const [amountOfJokes, setAmountOfJokes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (category == '') {
      alert('Please select the jokes category');
      return;
    }
    if (!amountOfJokes) {
      alert('Please enter the amount of jokes');
      return;
    }
    if (!language) {
      alert('Please select the preferred language');
      return;
    }
    
    try {
      setLoading(true);
      if(category && language && amountOfJokes){
        setLoading(false);
        navigation.navigate('ShowJokesScreen', {
          category: category,
          amountOfJokes: amountOfJokes,
          language: language
        });
        // navigation.navigate("ShowJokesScreen")
        // navigation.navigate('Account', {
        //   screen: 'ShowJokesScreen',
        //   params: { user: 'jane' },
        // });
      } else {
        setLoading(false);
        setErrortext("Please check all the things again");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };


  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Welcome to the Jokes World
            {/* {'\n'} */}
            {/* What kind of joke do you want to read? */}
          </Text>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Get your jokes based on your demand
            {'\n'}
          </Text>
          {/* <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            defaultNull
            placeholderStyle={{fontWeight: 'bold'}}
            placeholder="Select a category"
            dropDownMaxHeight = {20}
            // containerStyle={{height: 30}}
            onChangeItem={(item,index)=> {
              // this.setState({
              //     item: item.value
              // });
              setCategory(item.label)
            }}
          /> */}
          <Text>Select a category{'\n'}</Text>
          <View style={{ borderWidth: 1, borderColor: '#7DE24E', borderRadius: 8 }}>
            <Picker
              selectedValue={selectedCategory}
              style={{ height: 50, width: 200 }}
              itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
            >
              <Picker.Item label="Select One" value="" enabled={true}/>
              <Picker.Item label="Programming" value="Programming" />
              <Picker.Item label="Misc" value="Misc" />
              <Picker.Item label="Dark" value="Dark" />
              <Picker.Item label="Pun" value="Pun" />
              <Picker.Item label="Spooky" value="Spooky" />
              <Picker.Item label="Christmas" value="Christmas" />
              <Picker.Item label="Any" value="Any" />
            </Picker>
          </View>
          <Text>{'\n'}Enter the amount of jokes do you want to get?</Text>
        
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(amount) =>
                setAmountOfJokes(amount)
              }
              placeholder="Amount of Jokes" 
              placeholderTextColor="#8b9cc5"
              // autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   passwordInputRef.current &&
              //   passwordInputRef.current.focus()
              // }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          {/* <Text>{'\n'}</Text> */}
          {/* <DropDownPicker
            open={languageOpen}
            value={languageValue}
            items={languageItems}
            setOpen={setLanguageOpen}
            setValue={setLanguageValue}
            setItems={setLanguageItems}
            defaultNull
            placeholderStyle={{fontWeight: 'bold'}}
            placeholder="Select a language"
            // containerStyle={{height: 30}}
            onChangeItem={(item)=> {
              // this.setState({
              //     item: item.value
              // });
              setLanguage(item.value)
            }}
          /> */}
          <Text>Choose a language{'\n'}</Text>
          <View style={{ borderWidth: 1, borderColor: '#7DE24E', borderRadius: 8 }}>
            <Picker
              selectedValue={selectedLanguage}
              style={{ height: 50, width: 200 }}
              itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
              onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}
            >
              <Picker.Item label="Select One" value="" enabled= {true} />
              <Picker.Item label="en - English" value="en" />
              <Picker.Item label="de - German" value="de" />
              <Picker.Item label="cs - Czech" value="cs" />
              <Picker.Item label="es - Spanish" value="es" />
              <Picker.Item label="fr - French" value="fr" />
              <Picker.Item label="pt - Portuguese" value="pt" />
            </Picker>
          </View>
          {/* <Text>Choose a language{'\n\n'}</Text>
          <View>
            <Text>I would like</Text>
            <NumberPlease
              pickers={pizzaNumbers}
              values={pizzas}
              onChange={(values) => setPizzas(values)}
            />
          </View> */}
          {/* <Button
            onPress={goToJokesScreen}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          /> */}
          {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
          <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Search Jokes</Text>
            </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

// export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    fontSize : 20,
  },
  
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    margin: 10,
  },
  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    color: 'black',
    paddingLeft: 12,
    paddingRight: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#7DE24E',
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    width: 130,
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
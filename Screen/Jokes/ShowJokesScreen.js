
import React, { useEffect, useState, Component } from 'react';
import {FlatList, View, Text, SafeAreaView, StyleSheet,BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const ShowJokesScreen = ({route, navigation}) => {
  const { category, amountOfJokes,language } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // navigation.replace('Auth');
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return false;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onBackPress
        );
      };
    }, []),
  );

  useEffect(() => {
      fetch("https://v2.jokeapi.dev/joke/"+category+"?lang="+language+"&type=single&amount="+amountOfJokes)
      // fetch("https://v2.jokeapi.dev/joke/"+category+"?type=single&amount="+amountOfJokes)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{ flex: 1, padding: 24 }}>
      {/* <Text>cat: {JSON.stringify(category)}</Text>
      <Text>language: {JSON.stringify(language)}</Text>
      <Text>amount: {JSON.stringify(amountOfJokes)}</Text> */}
      {/* <Text>{"https://v2.jokeapi.dev/joke/"+category+"?type=single&amount="+amountOfJokes}</Text> */}
      {isLoading ? <Text>Loading...</Text> : 
      ( <View style={{ flex: 1, flexDirection: 'column', justifyContent:  'space-between'}}>
          {/* <Text style={{ fontSize: 18, color: 'green', textAlign: 'center'}}>{data.amount}</Text> */}
          <Text style={{ fontSize: 24, color: 'green', textAlign: 'center', paddingBottom: 10}}>Jokes Category: {category+'\n'} </Text>
          <FlatList
            data={data.jokes}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => ( 
              <Text  style={{ fontSize: 18, color: 'black', textAlign: 'center'}}>
                {'**'+ item.joke +'\n'}
              </Text>
            )}
          />
  
        </View>
      )}
      </View>
    </SafeAreaView>
  );
};


export default ShowJokesScreen ;


const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  text: {
    color: '#4f603c',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    width: 100,
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
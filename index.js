import React from 'react';
import {AppRegistry, Text, View, StyleSheet} from 'react-native';
import {name as appName} from './app.json';

// Minimal test app
const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Text style={styles.text}>React Native is working! 🎉</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#333',
  },
});

AppRegistry.registerComponent(appName, () => App);

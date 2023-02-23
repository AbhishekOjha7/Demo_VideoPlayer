import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import MyTabs from './TopTab';
import HomeScreen from '../modules/homeScreen';
import VideoPlayer from '../modules/videoPlayerScreen';
import {STRINGS} from '../utils/string';
const Stack = createNativeStackNavigator();
const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={STRINGS.LABEL.Home} component={HomeScreen} />
        <Stack.Screen name={STRINGS.LABEL.Tabs} component={MyTabs} />
        <Stack.Screen name={STRINGS.LABEL.Video} component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;

const styles = StyleSheet.create({});

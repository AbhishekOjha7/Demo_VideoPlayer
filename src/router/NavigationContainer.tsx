import React from 'react';
import MyTabs from './TopTab';
import {STRINGS} from '../utils/string';
import HomeScreen from '../modules/homeScreen';
import VideoPlayer from '../modules/videoPlayerScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

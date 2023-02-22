import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ArticlesScreen from '../modules/homeScreen/ArticlesScreen';
import ChannelScreens from '../modules/homeScreen/ChannelScreens';
import VideosScreen from '../modules/homeScreen/VideosScreen';
import {View, Text} from 'react-native';
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={({route}) => ({
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={
                focused
                  ? {
                      fontSize: 18,
                      color: 'white',
                      backgroundColor: '#52E2E1',
                      borderWidth: 0,
                      borderRadius: 20,
                      //   width: '120%',
                      //   height: 20,
                      textAlign: 'center',
                    }
                  : {fontSize: 18, color: 'black'}
              }>
              {route.name}
            </Text>
          );
        },
        // tabBarIndicatorStyle: {backgroundColor: 'red'},
        // tabBarLabelStyle: {color: '#fff'},
      })}>
      <Tab.Screen name="Channels" component={ChannelScreens} />
      <Tab.Screen name="Videos" component={VideosScreen} />
      <Tab.Screen name="Articles" component={ArticlesScreen} />
    </Tab.Navigator>
  );
}

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ArticlesScreen from '../modules/homeScreen/ArticlesScreen';
import ChannelScreens from '../modules/homeScreen/ChannelScreens';
import VideosScreen from '../modules/homeScreen/VideosScreen';
import {View, Text, StyleSheet} from 'react-native';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import {STRINGS} from '../utils/string';
const Tab = createMaterialTopTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={STRINGS.TOPTAB.Videos}
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          width: 0,
        },
        tabBarPressColor: 'white',
        tabBarLabel: ({focused}) => {
          return (
            <View
              style={[
                styles.toptabView,
                {backgroundColor: focused ? COLOR.lIGHTGREEN : COLOR.WHITE},
              ]}>
              <Text style={focused ? styles.active : styles.inActive}>
                {route.name}
              </Text>
            </View>
          );
        },
        swipeEnabled: false,
        // tabBarIndicatorStyle: {backgroundColor: 'red'},
        // tabBarLabelStyle: {color: '#fff'},
      })}>
      <Tab.Screen name={STRINGS.TOPTAB.Channels} component={ChannelScreens} />
      <Tab.Screen name={STRINGS.TOPTAB.Videos} component={VideosScreen} />
      <Tab.Screen name={STRINGS.TOPTAB.Articles} component={ArticlesScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  toptabView: {
    width: normalize(100),
    alignItems: 'center',
    padding: normalize(6),
    borderRadius: normalize(20),
  },
  active: {
    fontSize: 14,
    lineHeight: 20,
    color: COLOR.WHITE,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  inActive: {
    fontSize: 14,
    lineHeight: 20,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});

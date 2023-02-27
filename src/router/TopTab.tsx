import {COLOR} from '../utils/color';
import {STRINGS} from '../utils/string';
import {normalize} from '../utils/dimensions';
import {View, Text, StyleSheet} from 'react-native';
import VideosScreen from '../modules/homeScreen/VideosScreen';
import ArticlesScreen from '../modules/homeScreen/ArticlesScreen';
import ChannelScreens from '../modules/homeScreen/ChannelScreens';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={STRINGS.TOPTAB.Videos}
      screenOptions={({route}) => ({
        tabBarIndicatorStyle: {
          width: 0,
        },
        tabBarPressColor: COLOR.WHITE,
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
    lineHeight: normalize(20),
    color: COLOR.WHITE,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  inActive: {
    fontSize: 14,
    lineHeight: normalize(20),
    color: COLOR.BLACK,
    fontFamily: 'Poppins-SemiBold',
  },
});

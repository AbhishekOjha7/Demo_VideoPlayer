import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import localimages from '../utils/localimages';
import {normalize, vh} from '../utils/dimensions';

const HeaderComponents = ({HeaderTxt}: any) => {
  return (
    <View style={styles.headerMainView}>
      <TouchableOpacity hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}>
        <Image
          resizeMode="contain"
          source={localimages.left_arrow}
          style={styles.backImageIconStyle}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitleStyle}>{'Favorites'}</Text>
    </View>
  );
};

export default HeaderComponents;

const styles = StyleSheet.create({
  headerMainView: {
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    // borderWidth: 1,
  },
  backImageIconStyle: {
    width: normalize(30),
    height: normalize(30),
  },
  headerTitleStyle: {
    flex: 1,
    color: 'black',
    fontSize: normalize(26),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

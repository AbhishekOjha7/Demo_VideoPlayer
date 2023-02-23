import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import {COLOR} from '../utils/color';

const CircleImageComponent = ({
  userImage,
  Name,
  userNameStyle,
  subscribers,
}: any) => {
  return (
    <View style={styles.userView}>
      <View style={styles.userIconView}>
        <Image style={styles.userIcon} source={userImage} />
      </View>
      <Text style={[styles.userName, userNameStyle]}>{Name}</Text>
    </View>
  );
};

export default CircleImageComponent;

const styles = StyleSheet.create({
  userIconView: {
    width: normalize(35),
    height: normalize(35),
    borderRadius: normalize(25),
    overflow: 'hidden',
    marginHorizontal: normalize(20),
  },
  userIcon: {
    height: '100%',
    width: '100%',
  },
  userName: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#6F7070',
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

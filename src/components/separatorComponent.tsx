import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLOR} from '../utils/color';
import {normalize} from '../utils/dimensions';

const SeparatorLine = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: COLOR.SEPARATOR,
    borderWidth: 0.5,
    // marginHorizontal: normalize(20),
    // alignSelf: 'center',
    // marginTop: normalize(20),
  },
});

export default SeparatorLine;

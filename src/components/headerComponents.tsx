import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import localimages from '../utils/localimages';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import fonts from '../utils/fonts';

/**
 * @headerProps (Headertxt) is used for header of the screen
 *
 */
interface headerProps {
  HeaderTxt: string;
}

const HeaderComponents = (props: headerProps) => {
  const {HeaderTxt} = props;
  return (
    <View style={styles.headerMainView}>
      <View style={styles.headerInner}>
        <TouchableOpacity hitSlop={styles.hitsSlopStyle}>
          <Image
            resizeMode="contain"
            source={localimages.left_arrow}
            style={styles.backImageIconStyle}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitleStyle}>{HeaderTxt}</Text>
    </View>
  );
};

export default React.memo(HeaderComponents);

const styles = StyleSheet.create({
  headerMainView: {
    height: normalize(50),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInner: {
    width: '35%',
    paddingLeft: normalize(10),
  },
  backImageIconStyle: {
    width: normalize(30),
    height: normalize(30),
  },
  headerTitleStyle: {
    color: COLOR.BLACK,
    fontSize: normalize(26),
    fontFamily: fonts.EXTRABOLD,
  },
  hitsSlopStyle: {
    top: normalize(10),
    left: normalize(10),
    bottom: normalize(10),
    right: normalize(10),
  },
});

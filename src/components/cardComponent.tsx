import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize, screenWidth, vh} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import localimages from '../utils/localimages';
import {useNavigation} from '@react-navigation/native';
import fonts from '../utils/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {STRINGS} from '../utils/string';
interface customCardType {
  thumb: string;
  title: string;
  subtitle?: string;
  description?: string;
  onPress?: any;
  sources?: string;
  duration?: string;
}

/**
 * CardComponet render card
 */

const CardComponent = (props: customCardType) => {
  const {thumb, title, subtitle} = props;
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.carcContainer}>
      <View style={styles.thumbView}>
        <Image
          resizeMode="cover"
          style={styles.cardImg}
          source={{uri: thumb}}
        />
        <Image source={localimages.playIcon} style={styles.pauseIcon} />
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#5C3817',
            // backgroundColor: 'black',
            justifyContent: 'center',
            padding: 6,
            width: 60,
            height: 30,
            right: 10,
            bottom: 10,
            alignItems: 'center',
            opacity: 0.6,
            borderRadius: 8,
          }}>
          <Text style={{color: COLOR.WHITE, opacity: 1}}>{'5:30'}</Text>
        </View>
      </View>
      <View style={styles.headerView}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.viewsTxt}>
          {STRINGS.LABEL.views} {STRINGS.LABEL.unicode} {STRINGS.LABEL.days}
        </Text>
        <View style={styles.userView}>
          <Image style={styles.userIcon} source={localimages.girlIcon} />
          <Text style={styles.userNameStyle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CardComponent);

const styles = StyleSheet.create({
  cardImg: {
    aspectRatio: 1 / 0.5,
    width: '100%',
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  carcContainer: {
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    borderRadius: normalize(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  userNameStyle: {
    fontSize: normalize(14),
    fontFamily: fonts.MEDIUM,
    color: COLOR.TEXTGREY,
    marginLeft: normalize(10),
  },
  pauseIcon: {
    resizeMode: 'contain',
    height: normalize(25),
    width: normalize(25),
    position: 'absolute',
    zIndex: normalize(1),
  },
  thumbView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerView: {
    backgroundColor: COLOR.WHITE,
    padding: normalize(14),
    borderBottomRightRadius: normalize(10),
    borderBottomLeftRadius: normalize(10),
  },

  titleTxt: {
    fontFamily: fonts.BOLD,
    color: COLOR.BLACK,
    fontSize: normalize(16),
  },

  viewsTxt: {
    color: COLOR.TEXTGREY,
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(12),
    marginTop: normalize(6),
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  userIcon: {
    borderRadius: normalize(15),
    height: normalize(30),
    width: normalize(30),
  },
});

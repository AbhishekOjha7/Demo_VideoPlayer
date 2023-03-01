import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import localimages from '../utils/localimages';
import fonts from '../utils/fonts';
import {STRINGS} from '../utils/string';
interface customCardType {
  thumb: string;
  title: string;
  subtitle?: string;
  description?: string;
  onPress?: () => void;
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
        <View style={styles.videolengthView}>
          <Text style={styles.lengthText}>{STRINGS.LABEL.Length}</Text>
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

export default CardComponent;

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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  videolengthView: {
    position: 'absolute',
    backgroundColor: '#161616',
    justifyContent: 'center',
    padding: normalize(6),
    width: normalize(60),
    height: normalize(30),
    right: normalize(10),
    bottom: normalize(10),
    alignItems: 'center',
    opacity: 0.6,
    borderRadius: normalize(7),
  },
  lengthText: {
    color: COLOR.WHITE,
    fontFamily: fonts.MEDIUM,
  },
});

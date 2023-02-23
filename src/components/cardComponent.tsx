import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize, screenWidth, vh} from '../utils/dimensions';
import {COLOR} from '../utils/color';
import CircleImageComponent from './circleImageComponent';
import localimages from '../utils/localimages';
import {useNavigation} from '@react-navigation/native';
import fonts from '../utils/fonts';
import {Colors} from 'react-native/Libraries/NewAppScreen';
interface customCardType {
  thumb: any;
  title: any;
  subtitle?: string;
  description?: any;
  onPress?: any;
  sources?: any;
}

const CardComponent = (props: customCardType) => {
  const {thumb, title, subtitle, description} = props;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
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
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          resizeMode="cover"
          style={styles.cardImg}
          source={{uri: thumb}}
        />
        <Image source={localimages.playIcon} style={styles.pauseIcon} />
      </View>
      <View
        style={{
          backgroundColor: COLOR.WHITE,
          padding: normalize(14),
          borderBottomRightRadius: normalize(10),
          borderBottomLeftRadius: normalize(10),
        }}>
        <Text
          style={{
            fontFamily: fonts.BOLD,
            color: COLOR.BLACK,
            fontSize: normalize(16),
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: COLOR.TEXTGREY,
            fontFamily: fonts.MEDIUM,
            fontSize: normalize(12),
            marginTop: normalize(6),
          }}>
          {'94k views'} {'\u2022'} {'3 days ago'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: normalize(10),
          }}>
          <Image
            style={{
              borderRadius: normalize(15),
              height: normalize(30),
              width: normalize(30),
            }}
            source={localimages.girlIcon}
          />
          <Text style={styles.userNameStyle}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
    // <View>
    //   <TouchableOpacity style={styles.container} onPress={NavigatePlayVideo}>
    //     <Image source={localimages.playIcon} style={styles.pauseIcon} />
    //     <Image style={styles.cardImg} source={{uri: thumb}} />
    //   </TouchableOpacity>
    //   <Text style={styles.titleTxt}>{title}</Text>
    //   <View style={styles.noOfviews}>
    //     <Text style={styles.viewsTxt}>{'94k views'}</Text>
    //     <Text>{'  . '}</Text>
    //     <Text style={styles.daysAgo}>{'3 days ago'}</Text>
    //   </View>
    //   <View style={styles.circleImageViewStyle}>
    //     <CircleImageComponent
    //       userImage={localimages.girlIcon}
    //       Name={'Rachel Galler'}
    //     />
    //   </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     // borderWidth: 1,
  //     backgroundColor: COLOR.BACKGROUND,
  //   },
  //   cardContainer: {
  //     alignSelf: 'center',
  //     borderRadius: normalize(10),
  //     backgroundColor: 'white',
  //     marginVertical: normalize(10),
  //     width: normalize(335),
  //     height: normalize(325),
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 3,
  //     },
  //     shadowOpacity: 0.27,
  //     shadowRadius: 4.65,

  //     elevation: 6,
  //   },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImg: {
    aspectRatio: 1 / 0.5,
    width: '100%',
    borderTopLeftRadius: normalize(10),
    borderTopRightRadius: normalize(10),
  },
  titleTxt: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: normalize(20),
    marginVertical: normalize(10),
    color: COLOR.BLACK,
  },
  noOfviews: {
    flexDirection: 'row',
    marginLeft: normalize(20),
    width: '55%',
    justifyContent: 'space-between',
  },
  viewsTxt: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#7D7C7C',
  },
  daysAgo: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#7D7C7C',
  },
  // userView: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // userIconView: {
  //   width: normalize(40),
  //   height: normalize(40),
  //   borderRadius: normalize(25),
  //   overflow: 'hidden',
  //   // borderWidth: 1,
  //   marginHorizontal: normalize(20),
  //   marginVertical: normalize(10),
  // },
  // userIcon: {
  //   width: normalize(40),
  //   height: normalize(40),
  // },
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
  circleImageViewStyle: {marginTop: normalize(10)},
});

import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VideoPlayerComponent from '../../components/videoPlayerComponent';
import {normalize} from '../../utils/dimensions';
import {COLOR} from '../../utils/color';
import {Icons, videos} from '../../utils/dummyData';
import localimages from '../../utils/localimages';
import fonts from '../../utils/fonts';
import Share from 'react-native-share';
import CardComponent from '../../components/cardComponent';
import {NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

import {STRINGS} from '../../utils/string';
import Orientation from 'react-native-orientation-locker';
import {VideoShimmerContent} from '../../components/customShimmerEffetct';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VideoPlayer = ({route}: any) => {
  const {title, description, sources} = route.params;
  const [showVideo, unShowVideo] = useState(sources);
  const [mytitle, setTitle] = useState(title);

  const [mydescription, setMydescription] = useState(description);
  const [deviceOrientation, setdeviceOrientation] = useState('PORTRAIT');
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Orientation.getDeviceOrientation(data => setdeviceOrientation(data));
  // console.log('ispotraa', deviceOrientation);
  let data = videos.filter(item => item.sources[0] !== showVideo).splice(0, 5);

  // const statusbarHandle = () => {
  //   const platform = Platform.OS;
  //   console.log(
  //     platform === 'ios' && deviceOrientation === 'PORTRAIT',
  //     '------',
  //   );

  //   if (platform === 'ios' && deviceOrientation === 'PORTRAIT') {
  //     return StatusBarManager.HEIGHT;
  //   } else {
  //     return normalize(0);
  //   }
  // };

  useEffect(() => {
    Orientation.getOrientation(orientation => {
      console.log(orientation.includes('LANDSCAPE'));
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation =>
      setdeviceOrientation(orientation),
    );
  }, []);

  const onRender = ({item}: any) => {
    // console.log('thumb', item?.thumb);

    return (
      <>
        {loading ? (
          <VideoShimmerContent />
        ) : (
          <CardComponent
            onPress={() => {
              unShowVideo(item.sources[0]);
              setTitle(item?.title);
              setMydescription(item?.description);
            }}
            thumb={item?.thumb}
            title={item.title}
            subtitle={item?.subtitle}
            description={item?.description}
          />
        )}
      </>
    );
  };
  /**
   * @myCustomShare share
   *
   */
  const myCustomShare = async () => {
    const shareOptions = {
      message: title,
      url: sources,
    };
    try {
      const shareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('errror', error);
    }
  };

  const _listHeaderComponent = () => {
    return (
      <>
        <View style={styles.listHeaderView}>
          <Text style={styles.titleTxt}>{mytitle}</Text>
          <Text style={styles.viewsTxt}>
            {STRINGS.LABEL.views} {STRINGS.LABEL.unicode} {STRINGS.LABEL.days}
          </Text>
          <Text style={styles.descriptionTXt} numberOfLines={3}>
            {mydescription}
          </Text>
          <View style={styles.iconsView}>
            {Icons.map((item, index) => (
              <TouchableOpacity
                onPress={index === 2 ? myCustomShare : () => {}}
                key={index.toString()}
                style={styles.iconsTouchable}>
                <Image source={item.img} />
                <Text style={styles.iconsTitle}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.subscriberView}>
          <Image style={styles.subscriberIcon} source={localimages.girlIcon} />
          <View style={styles.subscriberHead}>
            <Text style={styles.technicalText}>{STRINGS.LABEL.subsriber}</Text>
            <Text style={styles.subscribetxt}>
              {STRINGS.LABEL.totalsubscriber}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.subscribeButton}>
            <Text style={styles.subscribebuttonTxt}>
              {STRINGS.LABEL.buttonTxt}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsView}>
          <View style={styles.commentsInner}>
            <View style={styles.noOfComments}>
              <Text style={styles.commentsText}>{STRINGS.LABEL.comments}</Text>
              <Text style={styles.commentsTxt}>
                {STRINGS.LABEL.totalCommnets}
              </Text>
            </View>
            <Image source={localimages.expand} />
          </View>
          <View style={styles.userCommentView}>
            <Image style={styles.commentsUser} source={localimages.girlIcon} />
            <View style={styles.descriptionComment}>
              <Text style={styles.commentsUserTxt} numberOfLines={2}>
                {description}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.similarView}>{STRINGS.LABEL.Similar}</Text>
      </>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            Platform.OS === 'ios'
              ? deviceOrientation.includes('PORTRAIT')
                ? normalize(50)
                : 0
              : 0,
        },
      ]}>
      {/* <View style={styles.videoContainer}> */}
      {/* <StatusBar  /> */}
      <VideoPlayerComponent videoUrl={showVideo} />
      {/* </View> */}
      <View>
        <FlatList
          data={data}
          style={styles.FlatListStyle}
          contentContainerStyle={styles.contentContainerStyle}
          renderItem={onRender}
          ListHeaderComponent={_listHeaderComponent}
        />
      </View>
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoContainer: {
    width: windowWidth,
    height: normalize(200),
    // borderWidth: 1,
    alignSelf: 'center',
  },
  listHeaderView: {
    padding: normalize(20),
  },
  titleTxt: {
    fontFamily: fonts.BOLD,
    color: COLOR.BLACK,
    fontSize: normalize(18),
  },
  viewsTxt: {
    color: COLOR.DESCRIPTIONTEXT,
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(14),
    marginTop: normalize(10),
  },
  descriptionTXt: {
    color: COLOR.DESCRIPTIONTEXT,
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(14),
    marginTop: normalize(10),
  },
  iconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(20),
    marginTop: normalize(30),
  },
  iconsTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsTitle: {
    marginTop: normalize(10),
    color: COLOR.DESCRIPTIONTEXT,
    fontSize: normalize(12),
    fontFamily: fonts.SEMIBOLD,
  },
  subscriberView: {
    paddingHorizontal: normalize(20),
    padding: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: COLOR.TEXTGREY,
    borderBottomColor: COLOR.TEXTGREY,
  },
  subscriberIcon: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(25),
  },
  subscriberHead: {
    width: 0,
    flex: 1,
    marginHorizontal: normalize(14),
  },
  subscribetxt: {
    marginTop: normalize(2),
    color: COLOR.DESCRIPTIONTEXT,
    fontFamily: fonts.MEDIUM,
  },
  subscribeButton: {
    backgroundColor: COLOR.lIGHTGREEN,
    borderRadius: normalize(20),
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(26),
  },
  commentsView: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(14),
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.TEXTGREY,
  },
  commentsInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: normalize(30),
  },
  noOfComments: {
    flexDirection: 'row',
  },
  commentsTxt: {
    marginLeft: normalize(20),
  },
  userCommentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: normalize(10),
  },
  commentsUser: {
    height: normalize(30),
    width: normalize(30),
    borderRadius: normalize(25),
  },
  descriptionComment: {
    flexDirection: 'row',
    width: 0,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: normalize(14),
  },
  similarView: {
    fontSize: 16,
    fontFamily: fonts.EXTRABOLD,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
    color: COLOR.BLACK,
  },
  subscribebuttonTxt: {
    color: COLOR.WHITE,
    fontSize: 14,
    fontFamily: fonts.MEDIUM,
  },
  commentsText: {
    fontSize: 14,
    fontFamily: fonts.SEMIBOLD,
    color: COLOR.BLACK,
  },
  commentsUserTxt: {
    color: COLOR.TEXTGREY,
    fontFamily: fonts.MEDIUM,
    fontSize: 12,
  },
  technicalText: {
    fontSize: 16,
    fontFamily: fonts.SEMIBOLD,
    color: COLOR.BLACK,
  },
  FlatListStyle: {
    height: windowHeight - normalize(250),
  },
  contentContainerStyle: {
    paddingBottom: normalize(10),
  },
});

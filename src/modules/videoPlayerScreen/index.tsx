import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import VideoPlayerComponent from '../../components/videoPlayerComponent';
import {normalize} from '../../utils/dimensions';
import {COLOR} from '../../utils/color';
import {Icons, videos} from '../../utils/dummyData';
import SeparatorLine from '../../components/separatorComponent';
import CircleImageComponent from '../../components/circleImageComponent';
import localimages from '../../utils/localimages';
import CustomButton from '../../components/subscribeButtonComponent';
import {useRoute} from '@react-navigation/native';
import fonts from '../../utils/fonts';
import CardComponent from '../../components/cardComponent';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VideoPlayer = ({route}: any) => {
  const {title, description, sources} = route.params;
  console.log('====>', title, description, sources);

  const onRender = ({item}: any) => {
    return (
      <CardComponent
        thumb={item?.thumb}
        title={item.title}
        subtitle={item?.subtitle}
        description={item?.description}
      />
    );
  };
  const _listHeaderComponent = () => {
    return (
      <>
        <View style={styles.listHeaderView}>
          <Text style={styles.titleTxt}>{title}</Text>
          <Text style={styles.viewsTxt}>
            {'94k views'} {'\u2022'} {'3 days ago'}
          </Text>
          <Text style={styles.descriptionTXt} numberOfLines={3}>
            {description}
          </Text>
          <View style={styles.iconsView}>
            {Icons.map((item, index) => (
              <TouchableOpacity
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
            <Text numberOfLines={1}>{'Technical Guruji'}</Text>
            <Text numberOfLines={1} style={styles.subscribetxt}>
              {'15k Subscribers'}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.8} style={styles.subscribeButton}>
            <Text>{'Subscribe'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentsView}>
          <View style={styles.commentsInner}>
            <View style={styles.noOfComments}>
              <Text>{'Comments'}</Text>
              <Text style={styles.commentsTxt}>{'32'}</Text>
            </View>
            <Image source={localimages.expand} />
          </View>
          <View style={styles.userCommentView}>
            <Image style={styles.commentsUser} source={localimages.girlIcon} />
            <View style={styles.descriptionComment}>
              <Text style={{}} numberOfLines={2}>
                {description}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.similarView}>{'Similar Videos'}</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoPlayerComponent videoUrl={sources} />
      </View>

      <View>
        <FlatList
          data={videos}
          style={{
            height: windowHeight - normalize(249),
          }}
          contentContainerStyle={{paddingBottom: normalize(10)}}
          renderItem={onRender}
          ListHeaderComponent={_listHeaderComponent}
        />
      </View>
    </SafeAreaView>
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
    borderWidth: 1,
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
    marginTop: 2,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: normalize(14),
  },
  similarView: {
    fontSize: 16,
    fontFamily: fonts.EXTRABOLD,
    paddingHorizontal: normalize(20),
    paddingTop: normalize(16),
  },
});

import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {normalize} from '../../utils/dimensions';
import {COLOR} from '../../utils/color';
import {useNavigation} from '@react-navigation/native';
import {videos} from '../../utils/dummyData';
import CardComponent from '../../components/cardComponent';
import {STRINGS} from '../../utils/string';

const VideosScreen = () => {
  const [data, setData] = React.useState(videos.slice(0, 3));
  const navigation = useNavigation<any>();

  const addData = () => {
    if (videos.length != data.length) {
      [...data, ...videos.slice(data.length - 1, data.length + 2)];
      setTimeout(() => {
        setData(prev => {
          return [...prev, ...videos.slice(data.length, data.length + 2)];
        });
      }, 1000);
    }
  };

  const _renderItem = ({item}: any) => {
    return (
      <CardComponent
        onPress={() => {
          navigation.navigate('VideoPlayer', {
            title: item?.title,
            description: item?.description,
            sources: item?.sources[0],
          });
        }}
        thumb={item.thumb}
        title={item.title}
        subtitle={item?.subtitle}
        description={item?.description}
      />
    );
  };
  return (
    <FlatList
      bounces={false}
      data={data}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentStyle}
      style={styles.flatlistStyle}
      renderItem={_renderItem}
      onEndReached={addData}
      onEndReachedThreshold={0.5}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={() => {
        return videos.length != data.length ? <ActivityIndicator /> : null;
      }}
    />
  );
};

export default React.memo(VideosScreen);

const styles = StyleSheet.create({
  contentStyle: {
    paddingBottom: normalize(20),
  },
  flatlistStyle: {
    marginBottom: normalize(20),
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: COLOR.BACKGROUND,
  // },
  // cardContainer: {
  //   alignSelf: 'center',
  //   borderRadius: normalize(10),
  //   backgroundColor: 'white',
  //   marginVertical: normalize(10),
  //   // width: normalize(335),
  //   // width: '90%',
  //   height: normalize(325),
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3,
  //   },
  //   shadowOpacity: 0.27,
  //   shadowRadius: 4.65,
  //   elevation: 6,
  // },
  // cardImg: {
  //   height: normalize(200),
  //   width: normalize(335),
  //   borderWidth: 0,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderTopLeftRadius: normalize(10),
  //   borderTopRightRadius: normalize(10),
  // },
  // titleTxt: {
  //   fontSize: 17,
  //   fontFamily: 'Poppins-SemiBold',
  //   marginHorizontal: normalize(20),
  //   marginVertical: normalize(10),
  //   color: COLOR.BLACK,
  // },
  // noOfviews: {
  //   flexDirection: 'row',
  //   marginLeft: normalize(20),
  //   width: '55%',
  //   justifyContent: 'space-between',
  // },
  // viewsTxt: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-Regular',
  //   color: '#7D7C7C',
  // },
  // daysAgo: {
  //   fontSize: 16,
  //   fontFamily: 'Poppins-Regular',
  //   color: '#7D7C7C',
  // },
  // // userView: {
  // //   flexDirection: 'row',
  // //   alignItems: 'center',
  // // },
  // // userIconView: {
  // //   width: normalize(40),
  // //   height: normalize(40),
  // //   borderRadius: normalize(25),
  // //   overflow: 'hidden',
  // //   // borderWidth: 1,
  // //   marginHorizontal: normalize(20),
  // //   marginVertical: normalize(10),
  // // },
  // // userIcon: {
  // //   width: normalize(40),
  // //   height: normalize(40),
  // // },
  // // userName: {
  // //   fontSize: 12,
  // //   fontFamily: 'Poppins-Regular',
  // //   color: COLOR.BLACK,
  // // },
  // pauseIcon: {
  //   resizeMode: 'contain',
  //   height: normalize(25),
  //   width: normalize(25),
  //   position: 'absolute',
  //   zIndex: normalize(1),
  // },
  // circleImageViewStyle: {marginTop: normalize(10)},
});

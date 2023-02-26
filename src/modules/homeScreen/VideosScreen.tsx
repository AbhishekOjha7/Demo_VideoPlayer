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
import {VideoShimmerContent} from '../../components/customShimmerEffetct';

const VideosScreen = () => {
  const [data, setData] = React.useState(videos.slice(0, 3));
  const navigation = useNavigation<any>();

  /**
   * @addData for implement pagination
   */

  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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

  /**
   *
   * @param _renderItem for flatlist render the CardComponent
   * @returns
   */

  const _renderItem = ({item}: any) => {
    return (
      <>
        {loading ? (
          <VideoShimmerContent />
        ) : (
          <CardComponent
            onPress={() => {
              navigation.navigate('VideoPlayer', {
                title: item?.title,
                description: item?.description,
                sources: item?.sources[0],
              });
            }}
            thumb={item?.thumb}
            title={item?.title}
            subtitle={item?.subtitle}
            description={item?.description}
          />
        )}
      </>
    );
  };

  const _listFooterComponent = () => {
    return videos.length != data.length ? <ActivityIndicator /> : null;
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
      ListFooterComponent={_listFooterComponent}
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
});

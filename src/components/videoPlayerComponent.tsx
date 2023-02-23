import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Video from 'react-native-video';
const VideoPlayerComponent = ({videoUrl}: any) => {
  return (
    <View style={styles.container}>
      <Video source={{uri: videoUrl}} style={styles.video} controls={true} />
    </View>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    // flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

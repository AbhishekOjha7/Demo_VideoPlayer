import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import PlayerController from './playerController';
const VideoPlayerComponent = ({videoUrl}: any) => {
  const [play, setPlay] = useState(false);
  const [showControl, setShowControl] = useState(true);
  console.log('videoUrl', videoUrl);

  const handlePlay = () => {
    setTimeout(() => setShowControl(false), 500);
    setPlay(true);
  };

  const handlePlayPause = () => {
    if (play) {
      setPlay(false);
      setShowControl(true);
      return;
    }
    setTimeout(() => setShowControl(false), 2000);
    setPlay(true);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{uri: videoUrl}}
        style={styles.video}
        controls={false}
        paused={!play}
      />
      <PlayerController
        onPlay={handlePlay}
        onPause={handlePlayPause}
        playing={play}
      />
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

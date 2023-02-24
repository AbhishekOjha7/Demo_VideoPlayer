import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import PlayerController from './playerController';
import SeekBar from './seekBarComponent';
const videoRef = React.createRef<any>();
const VideoPlayerComponent = ({videoUrl}: any) => {
  const [play, setPlay] = useState(false);
  const [showControl, setShowControl] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const skipBackward = () => {
    videoRef?.current?.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    console.log(currentTime + 10, currentTime);
    videoRef?.current?.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const onSeek = (data: any) => {
    videoRef?.current?.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };
  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  // console.log(currentTime);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        controls={false}
        paused={!play}
        onProgress={onProgress}
      />

      <PlayerController
        onPlay={handlePlay}
        onPause={handlePlayPause}
        playing={play}
        skipBackwards={skipBackward}
        skipForwards={skipForward}
      />

      <TouchableOpacity style={{position: 'absolute', top: 10, left: 10}}>
        <Image
          style={{
            height: 30,
            width: 30,
            tintColor: 'white',
          }}
          source={localimages.left_arrow}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <Image
          resizeMode="contain"
          style={{
            height: 30,
            width: 30,
            tintColor: 'white',
          }}
          source={localimages.fullscreen}
        />
      </TouchableOpacity>
      {/* <SeekBar
        currentTime={currentTime}
        duration={duration > 0 ? duration : 0}
        onSlideStart={handlePlayPause}
        onSlideComplete={handlePlayPause}
        onSlideCapture={onSeek}
      /> */}
    </View>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    // alignItems: 'center',
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

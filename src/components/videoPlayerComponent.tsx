import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Video from 'react-native-video';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import Slider from '@react-native-community/slider';
import {COLOR} from '../utils/color';
const videoRef = React.createRef<any>();
const VideoPlayerComponent = ({videoUrl}: any) => {
  const [play, setPlay] = useState(true);
  const [showControl, setShowControl] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const secondsToHHMMSS = (seconds: number | string) => {
    seconds = Number(seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);
    const hrs = h > 0 ? (h < 10 ? `0${h}:` : `${h}:`) : '';
    const mins = m > 0 ? (m < 10 ? `0${m}:` : `${m}:`) : '00:';
    const scnds = s > 0 ? (s < 10 ? `0${s}` : s) : '00';
    return `${hrs}${mins}${scnds}`;
  };

  const handlePlay = () => {
    setPlay(!play);
  };

  // const handlePlayPause = () => {
  //   if (play) {
  //     setPlay(false);
  //     setShowControl(true);
  //     return;
  //   }
  //   setTimeout(() => setShowControl(false), 2000);
  //   setPlay(true);
  // };

  const skipBackward = () => {
    videoRef?.current?.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    console.log(currentTime + 10, currentTime);
    videoRef?.current?.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const onEnd = () => {
    setPlay(true);
    videoRef.current.seek(0);
  };
  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };
  const onLoad = (obj: any) => {
    setDuration(obj.duration);
    setCurrentTime(obj.currentTime);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: videoUrl}}
        style={styles.video}
        controls={false}
        paused={play}
        onProgress={onProgress}
        onLoad={onLoad}
        resizeMode={'cover'}
        onEnd={onEnd}
      />

      <View style={styles.controllerView}>
        <TouchableOpacity style={styles.leftIcon}>
          <Image style={styles.backicon} source={localimages.left_arrow} />
        </TouchableOpacity>

        <TouchableOpacity onPress={skipBackward}>
          <Image
            resizeMode="contain"
            style={styles.backWardIcon}
            source={localimages.backward}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlay}>
          {!play ? (
            <Image
              resizeMode="contain"
              style={styles.pauseIcon}
              source={localimages.pauseIcon}
            />
          ) : (
            <Image
              resizeMode="contain"
              style={styles.playIcon}
              source={localimages.playIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.playIcon} onPress={skipForward}>
          <Image
            resizeMode="contain"
            style={styles.forwardIcon}
            source={localimages.forward}
          />
        </TouchableOpacity>

        <Slider
          style={styles.sliderStyle}
          value={currentTime}
          tapToSeek
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={COLOR.lIGHTGREEN}
          maximumTrackTintColor={COLOR.WHITE}
          thumbTintColor={COLOR.lIGHTGREEN}
          onSlidingComplete={value => {
            value = Array.isArray(value) ? value[0] : value;
            setCurrentTime(value);
            videoRef.current.seek(value);
          }}
        />

        <View style={styles.timerView}>
          <Text style={{color: 'red'}}>{secondsToHHMMSS(currentTime)}</Text>
          <Text style={{color: 'yellow'}}>{secondsToHHMMSS(duration)}</Text>
        </View>

        <TouchableOpacity style={styles.fullScreenView}>
          <Image
            resizeMode="contain"
            style={styles.expandIcon}
            source={localimages.fullscreen}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: 50,
    // backgroundColor: 'red',
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
  },
  video: {
    // // flex: 1,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    height: normalize(200),
    width: '100%',
    // resizeMode: 'cover',
    // borderWidth: 1,
  },
  playIcon: {
    height: 30,
    width: 35,
    tintColor: 'white',
  },
  pauseIcon: {
    height: normalize(30),
    width: normalize(35),
    tintColor: 'white',
  },
  backWardIcon: {
    height: normalize(35),
    width: normalize(35),
    tintColor: 'white',
  },
  forwardIcon: {
    height: normalize(35),
    width: normalize(35),
    tintColor: 'white',
  },
  controllerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    // backgroundColor: 'red',
    zIndex: 1,
    height: normalize(200),
    width: '100%',
    position: 'absolute',
  },
  leftIcon: {
    position: 'absolute',
    top: normalize(10),
    left: normalize(10),
  },
  backicon: {
    height: normalize(30),
    width: normalize(30),
    tintColor: 'white',
  },
  sliderStyle: {
    left: normalize(20),
    right: normalize(20),
    position: 'absolute',
    width: '90%',
    // borderWidth: 1,
    bottom: normalize(20),
    // alignItems: 'center',
  },
  timerView: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    position: 'absolute',
    bottom: normalize(10),
    left: normalize(10),
    // borderWidth: 1,
  },
  fullScreenView: {
    position: 'absolute',
    bottom: normalize(10),
    right: normalize(10),
  },
  expandIcon: {
    height: normalize(20),
    width: normalize(20),
    tintColor: 'white',
  },
});

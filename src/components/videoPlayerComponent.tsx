import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import Slider from '@react-native-community/slider';
import {COLOR} from '../utils/color';
import Orientation from 'react-native-orientation-locker';
import {useNavigation} from '@react-navigation/native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const videoRef = React.createRef<any>();
const VideoPlayerComponent = ({videoUrl}: any) => {
  const [play, setPlay] = useState(true);
  const [showControl, setShowControl] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [currOrientation, setOrientation] = useState('PORTRAIT');
  const navigation = useNavigation<any>();

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

  useEffect(() => {
    Orientation.getOrientation(orientation => {
      console.log(orientation.includes('LANDSCAPE'));
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
    return () => {
      Orientation.removeLockListener(handleFullScreen);
    };
  }, []);

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
    console.log('curreOtnsdf-->', currOrientation);
    if (currOrientation.includes('LANDSCAPE')) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
    console.log('currrrr', currOrientation);
  };

  const handlePlay = () => {
    console.log('hancdlll');
    setPlay(!play);
    // if (play) {
    //   setPlay(false);
    //   setShowControl(true);
    //   return;
    // }
    // setPlay(true);
    // setTimeout(() => {
    //   setShowControl(true);
    // }, 3000);
  };
  const skipBackward = () => {
    videoRef?.current?.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
  };

  const skipForward = () => {
    videoRef?.current?.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
  };

  const onEnd = () => {
    setPlay(true);
    videoRef.current.seek(0);
    setCurrentTime(0);
  };
  const onProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };
  const onLoad = (obj: any) => {
    setDuration(obj.duration);
    setCurrentTime(obj.currentTime);
  };
  const handleIcons = () => {
    console.log('++++++', showControl);
    setShowControl(true);
    setTimeout(() => {
      setShowControl(false);
    }, 3000);
  };

  const NavigateBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleIcons} activeOpacity={1}>
      <Video
        // rate={play ? 1.0 : 0.0}
        ref={videoRef}
        source={{uri: videoUrl}}
        style={fullscreen ? styles.fullscreeennns : styles.video}
        controls={false}
        muted={true}
        paused={!play}
        onProgress={onProgress}
        onLoad={onLoad}
        resizeMode={'cover'}
        onEnd={onEnd}
        fullscreen={fullscreen}
        fullscreenOrientation={'landscape'}
      />

      {showControl && (
        <View style={styles.controlTopView}>
          <TouchableOpacity style={styles.leftIcon} onPress={NavigateBack}>
            <Image style={styles.backicon} source={localimages.left_arrow} />
          </TouchableOpacity>

          <View style={styles.controllerView}>
            <TouchableOpacity onPress={skipBackward}>
              <Image
                resizeMode="contain"
                style={styles.backWardIcon}
                source={localimages.backward}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlay}>
              {play ? (
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
          </View>

          <Slider
            style={styles.sliderStyle}
            value={currentTime}
            tapToSeek
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={COLOR.lIGHTGREEN}
            maximumTrackTintColor={COLOR.WHITE}
            thumbTintColor={COLOR.lIGHTGREEN}
            // thumbImage={require('../assets/images/dot.png')}
            onSlidingComplete={value => {
              value = Array.isArray(value) ? value[0] : value;
              setCurrentTime(value);
              videoRef.current.seek(value);
            }}
          />

          <View style={styles.timerView}>
            <Text style={{color: COLOR.WHITE}}>
              {secondsToHHMMSS(currentTime)}
            </Text>
            <Text style={{color: COLOR.WHITE}}>
              {`/${secondsToHHMMSS(duration)}`}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.fullScreenView}
            onPress={handleFullScreen}>
            <Image
              resizeMode="contain"
              style={styles.expandIcon}
              source={localimages.fullscreen}
            />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VideoPlayerComponent;

const styles = StyleSheet.create({
  video: {
    height: normalize(200),
    width: '100%',
  },
  playIcon: {
    height: normalize(30),
    width: normalize(35),
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
    marginTop: '12%',
    justifyContent: 'space-evenly',
    height: normalize(35),
    width: '100%',
  },
  leftIcon: {
    width: normalize(30),
    height: normalize(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backicon: {
    height: normalize(30),
    width: normalize(30),
    tintColor: 'white',
  },
  sliderStyle: {
    left: normalize(20),
    right: normalize(20),
    width: '90%',
    marginTop: Platform.OS == 'ios' ? '8%' : '12%',
  },
  timerView: {
    flexDirection: 'row',
    marginLeft: normalize(10),
  },
  fullScreenView: {
    width: normalize(25),
    alignSelf: 'flex-end',
    marginTop: 'auto',
    height: normalize(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandIcon: {
    height: normalize(20),
    width: normalize(20),
    tintColor: 'white',
  },
  fullScreenVideo: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: 'green',
    borderWidth: 1,
    zIndex: 1,
  },
  fullscreeennns: {
    top: normalize(0),
    height: '100%',
    width: '100%',
  },
  controlTopView: {
    position: 'absolute',
    height: '100%',
  },
});

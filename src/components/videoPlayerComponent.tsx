import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLOR} from '../utils/color';
import Video from 'react-native-video';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';
import secondsToHHMMSS from '../utils/getDuration';
import {VideoShimmer} from './customShimmerEffetct';
import Slider from '@react-native-community/slider';
import React, {useEffect, useRef, useState} from 'react';
import Orientation from 'react-native-orientation-locker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const videoRef = React.createRef<any>();
const VideoPlayerComponent = ({videoUrl}: any) => {
  const isFocused = useIsFocused();
  const timeoutRef = useRef<any>([]);
  const [play, setPlay] = useState(true);
  const navigation = useNavigation<any>();
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = React.useState(true);
  const [showControl, setShowControl] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [currOrientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    Orientation.getOrientation(orientation => {
      if (orientation.includes('LANDSCAPE')) {
        Orientation.lockToPortrait();
      }
    });
    Orientation.addLockListener(orientation => setOrientation(orientation));
    return () => {
      Orientation.removeLockListener(handleFullScreen);
    };
  }, []);

  const getPlayState = () => {
    return !play;
  };

  /**
   * @handleFullScreen is used for orientation of the screen setfullScreen
   */

  const handleFullScreen = () => {
    setFullscreen(!fullscreen);
    if (currOrientation.includes('LANDSCAPE')) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  /**
   * @handlePlay is used for pause and play when pause the video controls also show on the screen
   */
  const handlePlay = () => {
    clerTimeOut();
    setPlay(prev => {
      if (prev === true) {
      } else {
        const timeout2 = setTimeout(() => {
          setShowControl(false);
        }, 3000);
        timeoutRef.current.push(timeout2);
      }
      return !play;
    });
  };
  /**
   * @skipBackward is used for move 10 sec back and show the controls
   */
  const skipBackward = () => {
    clerTimeOut();
    videoRef?.current?.seek(currentTime - 10);
    setCurrentTime(currentTime - 10);
    const timeout4 = setTimeout(() => {
      setShowControl(false);
    }, 3000);
    timeoutRef.current.push(timeout4);
  };

  const skipForward = () => {
    clerTimeOut();
    videoRef?.current?.seek(currentTime + 10);
    setCurrentTime(currentTime + 10);
    const timeout5 = setTimeout(() => {
      setShowControl(false);
    }, 3000);
    timeoutRef.current.push(timeout5);
  };

  /**
   * @onEnd is used for playing video true and when video is completed start the video again
   */
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
  /**
   * @handleIcons is used for show controls the videoPlayer screen when touch the screen
   */
  const handleIcons = () => {
    setShowControl(true);
    const timeout1 = setTimeout(() => {
      setShowControl(false);
    }, 3000);
    timeoutRef.current.push(timeout1);
  };

  const goBack = () => {
    setPlay(false);
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };
  /**
   * @NavigateBack is used for go back and lock the screen in potrait
   */
  const NavigateBack = () => {
    Orientation.lockToPortrait();
    fullscreen ? setFullscreen(false) : goBack();
  };
  const clerTimeOut = () => {
    while (timeoutRef.current.length > 0) {
      clearTimeout(timeoutRef.current.pop());
    }
  };
  const _onSlidingComplete = (value: any) => {
    value = Array.isArray(value) ? value[0] : value;
    setCurrentTime(value);
    videoRef?.current?.seek(value);
    if (play) {
      const timeout3 = setTimeout(() => {
        setShowControl(false);
      }, 3000);
      timeoutRef.current.push(timeout3);
    }
  };

  return (
    <TouchableOpacity onPress={handleIcons} activeOpacity={1}>
      {loading ? (
        <VideoShimmer />
      ) : (
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={fullscreen ? styles.fullscreeennns : styles.video}
          controls={false}
          paused={isFocused === false ? true : getPlayState()}
          onProgress={onProgress}
          onLoad={onLoad}
          resizeMode={'cover'}
          onEnd={onEnd}
          fullscreen={fullscreen}
          fullscreenOrientation={'landscape'}
        />
      )}
      {showControl ? (
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
            onSlidingStart={() => {
              clerTimeOut();
            }}
            onSlidingComplete={_onSlidingComplete}
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
      ) : null}
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
    alignSelf: 'center',
    bottom: normalize(-10),
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
    left: normalize(10),
    top: normalize(10),
    tintColor: COLOR.WHITE,
  },
  sliderStyle: {
    alignSelf: 'center',
    width: '90%',
    bottom: normalize(6),
    marginTop: Platform.OS == 'ios' ? '8%' : '12%',
  },
  timerView: {
    flexDirection: 'row',
    marginLeft: normalize(10),
  },
  fullScreenView: {
    width: normalize(25),
    alignSelf: 'flex-end',
    bottom: normalize(20),
    right: normalize(10),
    height: normalize(25),
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

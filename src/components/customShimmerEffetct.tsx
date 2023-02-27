import React from 'react';
import {COLOR} from '../utils/color';
import {normalize} from '../utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
const windowWidth = Dimensions.get('screen').width;
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const VideoShimmer = () => {
  const firstLineRef = React.createRef<any>();
  React.useEffect(() => {
    const videoAnimated = Animated.stagger(400, [
      Animated.parallel([firstLineRef.current.getAnimated()]),
    ]);
    Animated.loop(videoAnimated).start();
  }, []);

  return (
    <View style={styles.cardShimmerView}>
      <ShimmerPlaceholder
        style={styles.cardShimmerPlaceholder}
        ref={firstLineRef}
        stopAutoRun
      />
      <ActivityIndicator size={40} style={styles.indicatorStyle} />
    </View>
  );
};

const VideoShimmerContent = () => {
  const firstLineRef = React.createRef<any>();
  const secondLineRef = React.createRef<any>();
  React.useEffect(() => {
    const videoAnimated = Animated.stagger(400, [
      Animated.parallel([
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
      ]),
    ]);
    Animated.loop(videoAnimated).start();
  }, []);

  return (
    <View style={styles.shimmerContentView}>
      <ShimmerPlaceholder
        style={styles.innerCardShimmerStyle}
        ref={firstLineRef}
        stopAutoRun
      />
      <ShimmerPlaceholder
        style={styles.secondinnerCardShimmerStyle}
        ref={secondLineRef}
        stopAutoRun
      />
      <View style={styles.userShimmerView}>
        <ShimmerPlaceholder
          style={styles.userShimmerImage}
          ref={secondLineRef}
          stopAutoRun
        />
        <ShimmerPlaceholder
          style={styles.userShimmerName}
          ref={secondLineRef}
          stopAutoRun
        />
      </View>
    </View>
  );
};

export {VideoShimmer, VideoShimmerContent};

const styles = StyleSheet.create({
  cardShimmerView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    elevation: 5,
    zIndex: 5,
  },
  cardShimmerPlaceholder: {
    width: '100%',
    height: normalize(200),
  },
  indicatorStyle: {
    alignSelf: 'center',
    position: 'absolute',
  },
  shimmerContentView: {
    width: windowWidth - 40,
    backgroundColor: COLOR.TEXTGREY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(10),
    paddingBottom: normalize(10),
    alignSelf: 'center',
    marginTop: normalize(20),
  },
  innerCardShimmerStyle: {
    width: windowWidth - 40,
    height: normalize(180),
    marginHorizontal: normalize(20),
  },
  secondinnerCardShimmerStyle: {
    width: windowWidth - 80,
    height: normalize(20),
    marginHorizontal: normalize(20),
    marginTop: normalize(20),
    borderRadius: normalize(10),
  },
  userShimmerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userShimmerImage: {
    width: normalize(40),
    height: normalize(40),
    marginRight: normalize(20),
    marginTop: normalize(20),
    borderRadius: normalize(50),
  },
  userShimmerName: {
    width: windowWidth - 140,
    height: normalize(20),
    marginTop: normalize(20),
    borderRadius: normalize(10),
  },
});

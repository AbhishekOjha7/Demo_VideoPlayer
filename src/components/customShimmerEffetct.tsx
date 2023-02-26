import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {ActivityIndicator, Animated, Dimensions, View} from 'react-native';
import {normalize} from '../utils/dimensions';
import {COLOR} from '../utils/color';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const VideoShimmer = () => {
  const firstLineRef = React.createRef<any>();
  React.useEffect(() => {
    const facebookAnimated = Animated.stagger(400, [
      Animated.parallel([firstLineRef.current.getAnimated()]),
    ]);
    Animated.loop(facebookAnimated).start();
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ShimmerPlaceholder
        style={{
          width: '100%',
          height: normalize(200),
        }}
        ref={firstLineRef}
        stopAutoRun
      />
      <ActivityIndicator
        size={40}
        style={{
          alignSelf: 'center',
          position: 'absolute',
        }}
      />
    </View>
  );
};

const VideoShimmerContent = () => {
  // Handle animation
  const firstLineRef = React.createRef<any>();
  const secondLineRef = React.createRef<any>();

  React.useEffect(() => {
    const facebookAnimated = Animated.stagger(400, [
      Animated.parallel([
        firstLineRef.current.getAnimated(),
        secondLineRef.current.getAnimated(),
      ]),
    ]);
    Animated.loop(facebookAnimated).start();
  }, []);

  return (
    <View
      style={{
        width: windowWidth - 40,
        backgroundColor: COLOR.TEXTGREY,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: normalize(10),
        paddingBottom: normalize(10),
        // marginBottom: normalize(20),r
        alignSelf: 'center',
        marginTop: normalize(20),
      }}>
      <ShimmerPlaceholder
        style={{
          width: windowWidth - 40,
          height: 180,
          marginHorizontal: normalize(20),
          //   borderRadius: normalize(10),
        }}
        ref={firstLineRef}
        stopAutoRun
      />
      <ShimmerPlaceholder
        style={{
          width: windowWidth - 80,
          height: 20,
          marginHorizontal: normalize(20),
          marginTop: normalize(20),
          borderRadius: normalize(10),
        }}
        ref={secondLineRef}
        stopAutoRun
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ShimmerPlaceholder
          style={{
            width: 40,
            height: 40,
            marginRight: normalize(20),
            marginTop: normalize(20),
            borderRadius: normalize(50),
          }}
          ref={secondLineRef}
          stopAutoRun
        />
        <ShimmerPlaceholder
          style={{
            width: windowWidth - 140,
            height: 20,
            marginTop: normalize(20),
            borderRadius: normalize(10),
          }}
          ref={secondLineRef}
          stopAutoRun
        />
      </View>
      {/* <ShimmerPlaceholder ref={thirdLineRef} stopAutoRun /> */}
    </View>
  );
};

export {VideoShimmer, VideoShimmerContent};

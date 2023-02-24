import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';

const PlayerController = (props: any) => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;
  return (
    <View style={{}}>
      <TouchableOpacity style={{}} onPress={playing ? onPause : onPlay}>
        {playing ? (
          // <VideoPause height="50" width="50" />
          <Image
            resizeMode="contain"
            style={{height: 40, width: 45, tintColor: 'white'}}
            source={localimages.pauseIcon}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{height: 40, width: 45, tintColor: 'white'}}
            source={localimages.playIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PlayerController;

const styles = StyleSheet.create({});

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {normalize} from '../utils/dimensions';
import localimages from '../utils/localimages';

const PlayerController = (props: any) => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: 100,
      }}>
      <TouchableOpacity style={{}} onPress={skipBackwards}>
        <Image
          resizeMode="contain"
          style={{height: 35, width: 35, tintColor: 'white'}}
          source={localimages.backward}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{}} onPress={playing ? onPause : onPlay}>
        {playing ? (
          <Image
            resizeMode="contain"
            style={{height: 30, width: 35, tintColor: 'white'}}
            source={localimages.pauseIcon}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{height: 30, width: 35, tintColor: 'white'}}
            source={localimages.playIcon}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={{}} onPress={skipForwards}>
        <Image
          resizeMode="contain"
          style={{height: 35, width: 35, tintColor: 'white'}}
          source={localimages.forward}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerController;

const styles = StyleSheet.create({});

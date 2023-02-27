import React from 'react';
import {COLOR} from '../../utils/color';
import MyTabs from '../../router/TopTab';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import HeaderComponents from '../../components/headerComponents';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <HeaderComponents HeaderTxt={'Favorites'} />
      <MyTabs />
    </View>
  );
};

export default React.memo(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
});

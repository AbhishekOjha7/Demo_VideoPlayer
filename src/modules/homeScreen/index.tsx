import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyTabs from '../../router/TopTab';
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
    backgroundColor: 'white',
  },
});

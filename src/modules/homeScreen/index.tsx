import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MyTabs from '../../router/TopTab';
import HeaderComponents from '../../components/headerComponents';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponents />
      <MyTabs />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

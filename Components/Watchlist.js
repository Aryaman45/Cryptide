import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Crypto from './Crypto';
import Exchange from './Exchange';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }}}>
        <Tab.Screen name="Crypto" component={Crypto} />
        <Tab.Screen name="Trending" component={Exchange} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Open from './Open';
import Closed from './Closed';


const Tab = createMaterialTopTabNavigator();

export default function Portfolio() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator screenOptions={{
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' }}}>
        <Tab.Screen name="Open" component={Open} />
        <Tab.Screen name="Closed" component={Closed} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

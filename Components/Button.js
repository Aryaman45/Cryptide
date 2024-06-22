import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const BuyButtons = (props) => {
    const navigation = useNavigation();
    const item = props;
   

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* Solid Color Button */}
        <TouchableOpacity style={styles.solidButton} onPress={()=>{navigation.navigate('BUY', {item})}}>
          <Text style={styles.solidButtonText}>BUY</Text>
        </TouchableOpacity>

        {/* Border Button */}
        <TouchableOpacity style={styles.borderButton}  onPress={()=>{navigation.navigate('Sell', {item})}}>
          <Text style={styles.borderButtonText}>SELL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-between', // Add space between buttons
  },
  solidButton: {
    backgroundColor: '#6200EE', // Solid color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginHorizontal: 10,
    width:"35%" ,
    alignItems:"center",
    justifyContent:"center"
  },
  solidButtonText: {
    color: '#FFFFFF', // Text color for solid button
    fontSize: 16,
    fontWeight: 'bold',
  },
  borderButton: {
    borderColor: '#6200EE', // Border color
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginHorizontal: 10,
    width:"35%",
    alignItems:"center",
    justifyContent:"center"  // Add margin between buttons
  },
  borderButtonText: {
    color: '#6200EE', // Text color for border button
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuyButtons;

import React, { useRef, useEffect } from 'react';
import { View, Text, Pressable, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import COLORS from '../constants/colors';
import Button from '../constants/Button';

const { width: screenWidth } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');


    return (
        <SafeAreaView style={{backgroundColor:"white", flex:1}}>
            <View>
                <View style={styles.header}>
                    <Image style={{height:100,width:100}} source={require('../assets/LOGO.png')}/>
                    <Text>CRYPTIDE</Text>
                </View>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    carouselContainer: {
        position: 'absolute',
        top: Dimensions.get('window').height * 0.3,
        left: Dimensions.get('window').width * 0.05,
    },
    carouselImage: {
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 20,
    },
    titleText: {
        fontSize: Dimensions.get('window').width * 0.08,
        fontWeight: 'bold',
        color: '#00008b',
    },
    subtitleText: {
        fontSize: Dimensions.get('window').width * 0.035,
        color: '#000000',
        marginVertical: Dimensions.get('window').height * 0.01,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: Dimensions.get('window').height * 0.015,
        justifyContent: 'center',
    },
    loginText: {
        fontSize: Dimensions.get('window').width * 0.035,
        color: '#00008b',
    },
    loginButtonText: {
        fontSize: Dimensions.get('window').width * 0.035,
        color: '#00008b',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#764ABC',
        borderRadius: 10,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth - 40,
        marginHorizontal: 20,
        height: 200,
    },
    title: {
        fontSize: 24,
        color: 'white'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    emptyText: {
        fontSize: 18,
        color: 'grey',
    },

    header:{
        flexDirection:"row",
        alignItems:"center"
    }
});

export default Welcome;

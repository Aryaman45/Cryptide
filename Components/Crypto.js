import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


export default function Crypto() {

const [cryptoData , setcryptoData]= useState([]) 
const navigation = useNavigation();
    
  useEffect(() => {
    const fetchCryptoData = async () => {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&sparkline=true';
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-vxbQJ9yXQguoFP8tkaAagqht'
        }
      };

      try {
        const response = await axios(url, options);
        setcryptoData(response.data);
         
      } catch (error) {
        console.log("Error", error.message)
        
      }
    };

    fetchCryptoData();
  }, []);


    const getPriceColour = (price) => {
        if (price > 0) {
            return "green"
        }
        else {
            return "red"
        }
    }

    const data = ({ item }) => {

        const color = getPriceColour(item.current_price)
        return (
            <TouchableOpacity
            style={styles.Pdata}
            onPress={() => navigation.navigate('CryptoDetail', { item })} // Navigate with data
          >
            <View style={styles.Pdata}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingLeft: 15 }}>
                    <Image
                        style={styles.logo}
                        source={{ uri: item.image }}
                    />
                    <View style={{ alignItems: 'start' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>
                            {item.symbol}
                        </Text>
                    </View>
                </View>
                {item.current_price > 0 ? (<View>
                    <Text style={{ fontWeight: 'bold', color: color, paddingRight: 20, fontSize: 15 }}>
                    ₹ {item.current_price}
                    </Text>
                </View>) : (

                    <View>
                        <Text style={{ fontWeight: 'bold', color: color, paddingRight: 20, fontSize: 15 }}>
                            {item.current_price}
                        </Text>
                    </View>
                )


                }


            </View>

            </TouchableOpacity>
        )
    }

    const ItemSeparator = () => {
        return <View style={styles.separator} />;
      }

    return (
        <View style={styles.tabContent}>
            <>
                <FlatList
                    data={cryptoData}
                    renderItem={data}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={ItemSeparator}


                />
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    separator: {
        height: 10, // Adjust the height as needed
      },
    logo: {
  
      height: 40,
      width: 40,
    },
  
    Pdata: {
      backgroundColor: '#EEEEEE',
      width: '94%',
      height: 70,
      margin: 'auto',
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
  
    },
  
    tabBar: {
      height: 50, // Adjust the height as needed
      borderBottomWidth: 1,
      borderBottomColor: 'lightgray',
    },
    tab: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: 'blue',
    },
    tabText: {
      fontSize: 16,
      fontWeight: 'regular',
      color: 'black',
      textAlign: 'center', // Center align the text
    },
    activeTabText: {
      color: 'blue',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContent: {
      // backgroundColor: '#f5f6fb',
      paddingVertical: 20,
    },
    content: {
      alignItems: 'center',
    },
    image: {
      width: 500, // Adjust the width of the image as needed
      height: 150, // Adjust the height of the image as needed
      resizeMode: 'contain',
    },
    textContainer: {
      width: '80%', // Adjust width as needed
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 50,
    },
  });


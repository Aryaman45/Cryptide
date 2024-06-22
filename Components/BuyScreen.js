import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useState, useRef } from 'react';
import app from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {getAuth} from 'firebase/auth' 

export default function BuyScreen({ route }) {
    const navigation = useNavigation();
    const db = getFirestore(app);
    const firebaseAuth = getAuth(app)
    const { item } = route.params;

    const [price, setPrice] = useState(0);  // Initialize the price state
    const [Qty, setQty] = useState(0);  // Initialize the price state

    const input = useRef();

    const updatePrice = (text) => {
        const quantity = parseFloat(text);  // Convert the text input to a floating-point number
        setQty(quantity)
        if (!isNaN(quantity)) {
            setPrice(quantity * item.coin.current_price);
              // Update the price state if input is valid
        } else {
            setPrice(0);  // Reset price to 0 if input is not a valid number
        }
    };

    const ShowToast = () => {
        ToastAndroid.show(
          "You have insufficient fund",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
      const BuyCoin = async () => {
        const userid = firebaseAuth.currentUser.uid
        const userDocRef = doc(db, 'users', userid); // Reference to the user document
    
        try {
            // Fetch the current state of the document
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                // Get the current portfolio map
                const currentData = docSnapshot.data();
                if (currentData.Wallet < price) {
                    console.log("insufficient fund")
                    ShowToast()
                    return;
                }
                const currentPortfolio = currentData.portfolio || {};
    
                // New data to be added to the "portfolio" field
                const newKey = item.coin.symbol;
                // const quantity = parseFloat(input.current.value) || 0;
    
                if (currentPortfolio[newKey]) {
                    // If the coin already exists, update the quantity and buyPrice
                    currentPortfolio[newKey].quantity += Qty;
                    currentPortfolio[newKey].buyPrice += price; // Update the buyPrice if needed
                } else {
                    // If the coin does not exist, add a new entry
                    currentPortfolio[newKey] = {
                        id: Object.keys(currentPortfolio).length + 1,
                        name: item.coin.name,
                        price: item.coin.current_price,
                        symbol: item.coin.symbol,
                        url: item.coin.image,
                        open: true,
                        buyPrice: price,
                        quantity: Qty // Add quantity field
                    };
                }
    
                // Update the document with the new portfolio map
                await updateDoc(userDocRef, {
                    portfolio: currentPortfolio
                });
    
                console.log('User data added/updated successfully');
                navigation.navigate("Portfolio");
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error adding/updating user data: ', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ gap: 50 }} >
                <View style={styles.header}>
                    <Image style={styles.icon} source={{ uri: item.coin.image }} />
                    <Text style={{ fontSize: 30 }}> {item.coin.name}</Text>
                </View>
                <View style={styles.EstContainer}>
                    <Text style={{ color: "#a3a3a3", fontSize: 18 }}>Estimated Buying Price</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>₹ {item.coin.current_price}</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.line} />
                        <Text style={styles.text}>How much do you want to Buy?</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.Qty}>
                            <Text style={{ fontWeight: "500", color: "gray" }}>Quantity</Text>
                        </View>
                        <Text style={{ fontSize: 30 }}>=</Text>
                        <TextInput ref={input} style={styles.input} placeholder='QTY' onChangeText={updatePrice} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text>You Pay {price}</Text>
                    <TouchableOpacity style={styles.solidButton} onPress={BuyCoin}>
                        <Text style={styles.solidButtonText}>BUY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 40,
        width: 40
    },
    header: {
        flexDirection: "row",
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        borderBottomWidth: 5,
        borderBottomColor: "#f8f8f8"
    },
    EstContainer: {
        alignItems: "center",
        gap: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 50,
        justifyContent: "center"
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: 'gray',
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: "500"
    },
    solidButton: {
        backgroundColor: '#6200EE', // Solid color
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        marginHorizontal: 10,
        width: "45%",
        height: 60,
        alignItems: "center",
        justifyContent: "center"
    },
    solidButtonText: {
        color: '#FFFFFF', // Text color for solid button
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        borderWidth: 2,
        height: 55,
        width: 150,
        borderColor: "gray",
        borderRadius: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    Qty: {
        borderWidth: 2,
        height: 55,
        width: 150,
        borderColor: "gray",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    footer: {
        alignItems: "center",
        gap: 9,
        marginBottom: 20,
        borderTopWidth: 1,
        borderColor: "gray",
        justifyContent: "space-around",
        paddingTop: 10
    }
});

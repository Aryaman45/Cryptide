import { Text, View, Image, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import app from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {getAuth} from 'firebase/auth' 

export default function WithdrawScreen({ route }) {
    const navigation = useNavigation();
    const db = getFirestore(app);
    const firebaseAuth = getAuth(app);
    const { item } = route.params;

    const [price, setPrice] = useState(0);  // Initialize the price state
    const [Wallet, setWallet] = useState(0); // Initialize the wallet balance state
    const input = useRef();

    // Function to fetch the current wallet balance from Firebase
    const fetchWalletBalance = async () => {
        const userid = firebaseAuth.currentUser.uid;
        const userDocRef = doc(db, 'users', userid);
        try {
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                const currentData = docSnapshot.data();
                setWallet(currentData.Wallet || 0); // Assume 'walletBalance' field in your user document
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error fetching wallet balance: ', error);
        }
    };
    const InsufficientFund = () => {
        ToastAndroid.show(
          "You have insufficient fund",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }

      const OrderSuccessfull = () => {
        ToastAndroid.show(
          "Successfully Submitted Withdrawl Request",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      }
    

    useEffect(() => {
        fetchWalletBalance();
    }, []);

    const updatePrice = (text) => {
        const quantity = parseFloat(text);  // Convert the text input to a floating-point number
        if (!isNaN(quantity)) {
            setPrice(quantity);  // Update the price state if input is valid
        } else {
            setPrice(0);  // Reset price to 0 if input is not a valid number
        }
    };

    const handleWithdraw = async () => {
        if (price > Wallet) {
            InsufficientFund();
            console.log('Insufficient balance');
            return;
        }

        const userid = firebaseAuth.currentUser.uid;
        const userDocRef = doc(db, 'users', userid);
        const withdrawalRequest = {
            id: Date.now().toString(),
            amount: price,
            timestamp: new Date(),
            status: 'pending'
        };

        try {
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                const currentData = docSnapshot.data();
                const withdrawalRequests = currentData.withdrawalRequests || {};

                // Add the new withdrawal request
                withdrawalRequests[withdrawalRequest.id] = withdrawalRequest;

                // Update the document with the new withdrawal request
                await updateDoc(userDocRef, {
                    withdrawalRequests: withdrawalRequests
                });
                OrderSuccessfull();

                console.log('Withdrawal request added successfully');
                navigation.navigate("Back");
            } else {
                console.log('User document does not exist');
            }
        } catch (error) {
            console.error('Error adding withdrawal request: ', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ gap: 50 }} >
                <View style={styles.header}>
                    {/* <Image style={styles.icon} source={{ uri: item.coin.image }} /> */}
                    <Text style={{ fontSize: 30 }}> Withdraw</Text>
                </View>
                <View style={styles.EstContainer}>
                    <Text style={{ color: "#a3a3a3", fontSize: 18 }}>Available Balance</Text>
                    <Text style={{ fontSize: 20, fontWeight: "700" }}>₹ {Wallet} </Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.line} />
                        <Text style={styles.text}>How much do you want to Withdraw?</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.Qty}>
                            <Text style={{ fontWeight: "500", color: "gray" }}>Withdraw</Text>
                        </View>
                        <Text style={{ fontSize: 30 }}>=</Text>
                        <TextInput ref={input} style={styles.input} placeholder='Withdraw' onChangeText={updatePrice} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text>Withdrawl Amount {price} </Text>
                    <TouchableOpacity style={styles.solidButton} onPress={handleWithdraw}>
                        <Text style={styles.solidButtonText}>Withdraw</Text>
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

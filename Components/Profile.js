import { Text, View, Button, ScrollView, SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import app from '../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import React, { useState, useEffect } from 'react';
import WithdrawButton from './WIthdrawButton';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Profile() {
    const navigation = useNavigation()
    const firestore = getFirestore(app);
    const firebaseAuth = getAuth(app)
    const [CryptoData, setcryptoData] = useState();
    const [Gainer, setGainer] = useState();
    const [walletBalance, setWalletBalance] = useState(0);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchCryptoData = async () => {
            const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'x-cg-demo-api-key': 'CG-vxbQJ9yXQguoFP8tkaAagqht'
                }
            };

            try {
                const response = await axios(url, options);
                const firstFiveData = response.data.slice(0, 5);
                const gainer = response.data.slice(6, 11);

                setcryptoData(firstFiveData);
                setGainer(gainer);
                setLoading(false); // Data fetched, set loading to false

            } catch (error) {
                console.log("Error", error.message)
                setLoading(false); // Error occurred, set loading to false
            }
        };

        fetchCryptoData();
    }, []);

    useEffect(() => {
        const userId = firebaseAuth.currentUser.uid;
       
        const userDocRef = doc(firestore, 'users', userId); // Reference to the user document

        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            const userData = docSnapshot.data();
            
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                
                if (userData && userData.Wallet !== undefined) {
                    setWalletBalance(userData.Wallet);
                    setName(userData.Name);
                    console.log(name)
                } else {
                    console.log('Wallet balance not found in user document');
                }
            } else {
                console.log('User document does not exist');
            }
        });

        return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }, []);

    const getColor = (price) => {
        if (price > 0) {
            return 'green'
        }
        else {
            return 'red'
        }
    }

    const RenderItem = ({ item }) => {
        const color = getColor(item.price_change_percentage_24h)
        return (
            <View style={{ flexDirection: "row", gap: 18, paddingLeft: 20 }}>
                <View style={styles.coinBox}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
                        <View>
                            <Text style={{ fontWeight: "700", color: "black", fontSize: 16 }}>{item.name}</Text>
                            <Text>{item.symbol}</Text>
                        </View>
                        <Image style={{ height: 35, width: 35 }} source={{ uri: item.image }} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontWeight: "700", color: "black", fontSize: 16 }}>₹ {item.current_price}</Text>
                        <Text style={{ fontWeight: "500", color: color }}>{item.price_change_percentage_24h.toFixed(4)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const RenderGainer = ({ item }) => {
        const color = getColor(item.price_change_percentage_24h)

        return (
            <View style={{ flexDirection: "row", gap: 18, paddingLeft: 20 }}>
                <View style={styles.coinBox}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", }}>
                        <View>
                            <Text style={{ fontWeight: "700", color: "black", fontSize: 16 }}>{item.name}</Text>
                            <Text>{item.symbol}</Text>
                        </View>
                        <Image style={{ height: 35, width: 35 }} source={{ uri: item.image }} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={{ fontWeight: "700", color: "black", fontSize: 16 }}>₹ {item.current_price}</Text>
                        <Text style={{ fontWeight: "500", color: color }}>{item.price_change_percentage_24h.toFixed(4)}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const Logout =  async () => {
        try {
          await firebaseAuth.signOut();
          // You can navigate to another screen or perform any other action upon successful logout
          navigation.navigate('Login')
        
        } catch (error) {
         
          Alert.alert('Error', 'Failed to sign out');
        }
      }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" /> // Show loader while loading
            ) : (
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 24, fontWeight: "700" }}>{name}</Text>
                        {/* <View style={{ height: 50, width: 50, backgroundColor: "black", borderRadius: 50 }}></View> */}
                        <Image style={{ height: 50, width: 50 }} source={require('../assets/userProfile.png')} />
                    </View>
                    <View style={styles.walletContainer}>
                        <View style={{ marginTop: 20, gap: 5 }}>
                            <Text style={{ fontSize: 15, fontWeight: "700", color: "gray", paddingLeft: 10 }}>Trading Balance</Text>
                            <Text style={{ fontSize: 27, fontWeight: "800", color: "black", paddingLeft: 15 }}>₹ {walletBalance}</Text>
                        </View>
                        <View style={{ height: 150 }}>
                            <WithdrawButton />
                        </View>
                    </View>
                    <View style={styles.coinContainer}>
                        <View style={{ gap: 15 }}>
                            <Text style={{ fontSize: 22, fontWeight: "700", color: "black", paddingLeft: 10 }}>Top Trending</Text>
                            <ScrollView horizontal={true}>
                                <FlatList
                                    data={CryptoData}
                                    renderItem={RenderItem}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                                    contentContainerStyle={styles.listContainer}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.coinContainer}>
                        <View style={{ gap: 15 }}>
                            <Text style={{ fontSize: 22, fontWeight: "700", color: "black", paddingLeft: 10 }}>Top Gainer</Text>
                            <ScrollView>
                                <FlatList
                                    data={Gainer}
                                    renderItem={RenderGainer}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                                    contentContainerStyle={styles.listContainer}
                                />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.FooterContainer}>
                            <View style={styles.aboutList}>
                                <TouchableOpacity onPress={()=>{navigation.navigate("KYC")}}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../assets/USER_1.png')} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>KYC Update</Text>
                                </View>
                                
                                
                                </TouchableOpacity>
                            </View>
                            <View style={styles.separator} />

                            <View style={styles.aboutList}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../assets/Privacy.png')} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "black" }}>Privacy Policy</Text>
                                </View>
                                <AntDesign name="caretright" size={15} color="black" />
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.aboutList}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../assets/Terms.png')} />
                                    <Text style={{ fontSize: 20, fontWeight: "500" }}>Terms & conditions</Text>
                                </View>
                                <AntDesign name="caretright" size={15} color="black" />

                            </View>
                            <View style={styles.separator} />
                            <View style={styles.aboutList}>
                                <TouchableOpacity onPress={()=>Logout()}>
                                <View style={{ flexDirection: "row", gap: 10 }}>
                                    <Image style={{ height: 25, width: 25 }} source={require('../assets/Log_Out.png')} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "red" }}>Logout</Text>
                                </View>
                                {/* <AntDesign name="caretright" size={15} color="red" /> */}
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            )
            }
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        height: 80,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    footer: {
        width: "95%",
        height: 250,
        backgroundColor: "#f6fafd",
        marginHorizontal: "auto",
        marginTop: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    walletContainer: {
        backgroundColor: "#f6fafd",
        height: 200,
        width: "95%",
        margin: "auto",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    coinBox: {
        height: 150,
        width: 130,
        backgroundColor: "#f6fafd",
        borderRadius: 10,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    coinContainer: {
        marginTop: 20
    },
    aboutList: {
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor:"blue",
        height: "20%",
        alignItems: "center",


    },
    FooterContainer: {
        justifyContent: "space-around",
        // backgroundColor:"blue",
        width: "95%",
        height: "90%"
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E8EA',
        marginVertical: 10,
    }
});

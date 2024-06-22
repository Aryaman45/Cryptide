import { Text, FlatList, View, Image, StyleSheet } from 'react-native'

import React, { useEffect, useState } from 'react';
import { onValue, ref, doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import app from '../firebaseConfig';


export default function Open() {
    const firebaseAuth = getAuth(app)
    const db = getFirestore(app)

    const [Portfolio, setPortfolio] = useState([])

    useEffect(() => {
        const userId = firebaseAuth.currentUser.uid;


        const userDocRef = doc(db, 'users', userId); // Reference to the user document

        const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const userData = docSnapshot.data();
                console.log("portofolio", userData.portfolio)

                if (userData && userData.portfolio !== undefined) {
                    const portfolioArray = Object.values(userData.portfolio);

                    setPortfolio(Object.values(userData.portfolio)); // Convert object to array if necessary
                    console.log("Portfoli", Portfolio)
                } else {
                    console.log('Wallet balance not found in user document');
                }
            } else {
                console.log('User document does not exist');
            }
        });

        return () => unsubscribe();
    }, []);

    console.log("Portfolio", Portfolio)

    const getPriceColour = (price) => {
        if (price > 0) {
            return "green"
        }
        else {
            return "red"
        }
    }


    const data = ({ item }) => {

        const color = getPriceColour(item.price)
        if(!item.open){
            return null;
        }
        return (

            <View style={styles.Pdata}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingLeft: 15 }}>
                    <Image
                        style={styles.logo}
                        source={{ uri: item.url }}
                    />
                    <View style={{ alignItems: 'start' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                            {item.name}
                        </Text>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: 12, color: 'grey' }}>
                            {item.symbol}
                        </Text>

                        <Text
                            style={{ fontWeight: 'bold', fontSize: 12, color: 'black' }}>
                          QTY  {item.quantity}
                        </Text>
                    </View>
                </View>
                {item.price > 0 ? (<View>
                    <Text style={{ fontWeight: 'bold', color: color, paddingRight: 20, fontSize: 15 }}>
                        + {item.buyPrice.toFixed(2)}
                    </Text>
                </View>) : (

                    <View>
                        <Text style={{ fontWeight: 'bold', color: color, paddingRight: 20, fontSize: 15 }}>
                            {item.price}
                        </Text>
                    </View>
                )


                }


            </View>
        )
    }


    return (

        <View style={{ flex: 1, backgroundColor: "white", justifyContent:"center" }}>

            {Portfolio.length > 0? (
                <FlatList
                    data={Portfolio}
                    renderItem={data}
                    keyExtractor={(item) => item.id}
                />
            ) : (
              <View style={{alignItems:"center"}}>
                <Image style={{height:200,width:200}} source={require("../assets/open.png")} />
                <Text>You have open position at this moment.</Text>
              </View>
            )}

        </View>

    )
}


const styles = StyleSheet.create({
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
})
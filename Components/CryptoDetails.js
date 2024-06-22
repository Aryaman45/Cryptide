import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import BuyButtons from './Button';

export default function CryptoDetail({ route }) {
    const { item } = route.params;

    const data = {
        labels: ["price"],
        datasets: [
            {
                data: item.sparkline_in_7d.price,
                color: (opacity = 1) => `rgba(97, 245, 39, 1)`, // optional
                strokeWidth: 2 // optional
            }
        ],
    };

    const getPriceColor = (price) => {
        if (price > 0) {
            return "green";
        } else {
            return "red";
        }
    };

    const chartConfig = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    };

    const screenWidth = Dimensions.get("window").width;

    return (
        <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', gap: 5, marginTop: 10 }}>
                    <Image style={{ height: 50, width: 50 }} source={{ uri: item.image }} />
                    <Text style={{ fontSize: 40 }}>{item.name}</Text>
                </View>
                <View style={styles.headBox}>
                    <Text>{item.price_change_percentage_24h}</Text>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <LineChart
                    data={data}
                    width={screenWidth}
                    height={300}
                    verticalLabelRotation={30}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: (opacity = 1) => `rgba(248, 245, 246, ${opacity})`,
                    }}
                    bezier
                    withDots={false}
                />
            </View>
            <View style={styles.about}>
                <View style={{ flexDirection: "row", gap: 5 }}>
                    <Image style={{ height: 25, width: 25 }} source={require('../assets/2 (3).png')} />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>About</Text>
                </View>
                <View style={styles.listContainer}>
                    <View style={styles.aboutList}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../assets/1 (1).png')} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Global Volume</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.total_volume}</Text>
                    </View>
                    <View style={styles.aboutList}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../assets/3.png')} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>High</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "green" }}>₹ {item.high_24h}</Text>
                    </View>
                    <View style={styles.aboutList}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../assets/4.png')} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Low</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}> ₹ {item.low_24h}</Text>
                    </View>
                    <View style={styles.aboutList}>
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../assets/5.png')} />
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Supply</Text>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{item.max_supply}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                <BuyButtons coin={item} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "white",
        height: "15%",
        alignItems: "center"
    },
    headBox: {
        height: "30%",
        width: "55%",
        backgroundColor: '#e0e9fe',
        marginTop: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    chartContainer: {
        backgroundColor: "black",
        paddingBottom: 0,
        height: 270
    },
    about: {
        backgroundColor: '#e0e9fe',
        width: '94%',
        padding: 10,
        height: "35%",
        borderRadius: 15,
        marginHorizontal: '3%',
        gap: 10,
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    aboutList: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: "20%",
        alignItems: "center"
    },
    listContainer: {
        height: "70%",
        width: "100%",
        justifyContent: "space-between"
    }
});

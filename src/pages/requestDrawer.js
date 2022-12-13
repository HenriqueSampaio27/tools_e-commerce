import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";
import OrderItem from "../componets/OrderItem";

export default function RequestDrawer(){
    
    const[date, setDate] = useState(tools)
    const navigation = useNavigation()
    
    /* 
    {
                            date.map((item, index) => {
                                return(
                                    <OrderItem
                                    cover={item.image1}
                                    name={item.name}
                                    price={item.price}
                                    amount={item.soldAmount}
                                    chave={index}
                                    onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                        image1: item.image1, image2: item.image2, image3: item.image3, soldAmount: item.soldAmount, Sold: date})}
                                    />
                                )
                            })
                        }
    */
    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Pedidos</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        <FlatList 
                            vertical
                            data={date}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => 
                                {return(
                                    <OrderItem
                                    cover={item.image1}
                                    name={item.name}
                                    price={item.price}
                                    amount={item.soldAmount}
                                    onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                        image1: item.image1, image2: item.image2, image3: item.image3, soldAmount: item.soldAmount, Sold: date})}
                                    /> 
                                )}
                            }
                            />
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "12%",
        backgroundColor: '#2799F3'
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        width: "50%",
        marginLeft: 85,
        fontSize: 20
    }
})

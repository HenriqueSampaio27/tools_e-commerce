import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";

export default function FavoriteDrawer(){
    
    const[date, setDate] = useState(tools)
    const navigation = useNavigation()
    
    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Favoritos</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                <ScrollView style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, paddingBottom: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        {date.map((item, index) => {
                            return(
                                <TouchableOpacity style={styles.itens} key={index} onPress={() => {navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                                                                        image1: item.image1, image2: item.image2, image3: item.image3, soldAmount: item.soldAmount, date: date})}}>
                                    <Image source={{uri: item.image1}} style={styles.image} resizeMode='contain'/>
                                    <Text style={styles.name} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
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
    },
    itens:{
        flexDirection: 'row',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        borderRadius: 20,
        width: '90%',
        height: 60,
        alignItems: 'center',
        marginBottom: 10
    },
    name:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginLeft: 8,
        width: '75%'
    },
    image: {
        height: 50,
        width: 50,
        marginLeft: 8
    }
})

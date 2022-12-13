import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";
import Stars from 'react-native-stars'

export default function ItemByCategory({route}){
    
    const[date, setDate] = useState(tools)
    const[categoryItem, setCategoryItem] = useState()
    const[rating, setRating] = useState(4)

    const navigation = useNavigation()

    let installmentPrice
    let installmentPriceFloat
    
    function load(){
        if(route.params.category){
            const categoryAux = date.filter(item => {
                const itemDate = item.category? item.category.toUpperCase() : ''.toUpperCase()
                const textDate = route.params.category.toUpperCase()
                return itemDate.indexOf(textDate) > -1
            })
            setCategoryItem(categoryAux)
        }
    }

    useEffect(() => {
        load()
    }, [route])

    if(categoryItem == undefined){
        return(
            <View>

            </View>
        )
    }

    function split(price){
        let price2 = parseInt(price)
        installmentPrice = price2/6
        installmentPrice = installmentPrice.toFixed(2)
        installmentPriceFloat = [installmentPrice[(installmentPrice.length)-2], installmentPrice[(installmentPrice.length)-1]]
        installmentPrice = parseInt(installmentPrice)
        installmentPrice = [installmentPrice, ",", installmentPriceFloat]
    }

    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>{route.params.category}</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                <ScrollView style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, paddingBottom: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        {categoryItem.map((item, index) => {
                            
                            split(item.price)
                            
                            return(
                                <TouchableOpacity style={styles.itens} key={index} onPress={() => {navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                                                                        image1: item.image1, image2: item.image2, image3: item.image3, soldAmount: item.soldAmount, date: date})}}>
                                    <Image source={{uri: item.image1}} style={styles.image} resizeMode='contain'/>
                                    <View style={styles.info}>
                                        <Text style={styles.name} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                        <View style={{flexDirection: 'row', width: '90%', alignItems: 'center', marginBottom: 5, marginTop: 5, marginLeft: 8}}>
                                            <Stars
                                            default={rating}
                                            count={5}
                                            half={false}
                                            fullStar={<IconI name="star" color={"#FFFF00"} size={16}/>}
                                            emptyStar={<IconI name="star-outline" color={"black"} size={16}/>}
                                            />
                                            <Text style={styles.ratingStar}>{rating}.0</Text>
                                        </View>
                                        <Text style={styles.price}>R$ {item.price}</Text>
                                        <View style={{flexDirection: 'row', width: '90%', alignItems: 'center', marginBottom: 5, marginTop: 5}}>
                                            <Text style={styles.installmentPrice}>até 6x de R$ {installmentPrice}</Text>
                                            <Text style={styles.fees}> sem juros</Text>
                                        </View>
                                    </View>
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
        height: 150,
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10
    },
    image: {
        height: 100,
        width: 100,
        marginLeft: 8
    },
    info:{
        width: "70%"
    },
    name:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        marginLeft: 8,
        width: '90%'
    },
    price:{
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginLeft: 8,
        marginTop: 10,
        width: '90%'
    },
    installmentPrice:{
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginLeft: 8
    },
    fees:{
        fontSize: 14,
        color:'#00C343',
        fontFamily: "Montserrat-Medium"
    },
    ratingStar:{
        color: 'black',
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        marginLeft: 3,
        marginRight: 2
    },
})
import { useNavigation } from "@react-navigation/native"
import React, {useEffect, useState} from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'
import {useBag} from '../context/cartContext'
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Cart({route}){
    
    const {bag} = useBag()
    const {total} = useBag()
    const {decrement} = useBag()
    const {increment} = useBag()
    const {remove} = useBag()

    const navigation = useNavigation()

    const[cartBag, setCartBag] = useState(bag)

    function irFinish(){
        if(cartBag.length != 0){
            navigation.navigate('info_pay', {cartBag: cartBag, screen: 'cart'})
        }else{
            Alert.alert(
                "O carrinho está vazio!",
                " ",
                [
                    {
                        text: 'Ok',
                    }
                ]
            )
        }
    }

    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Carrinho</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "78%" }}>
                <ScrollView style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        {
                            cartBag.map((item, index) => {
                                const [amount,setAmount] = useState(1)
                                function sum(){
                                    if(amount < 20){
                                        const sum = amount + 1
                                        setAmount(sum)
                                        increment(item.price)
                                    }
                                }
                                function strip(){
                                    if(amount > 1){
                                        const strip = amount - 1
                                        setAmount(strip)
                                        decrement(item.price)
                                    }
                                }
                                function removeItem(){
                                    Alert.alert(
                                        "Deseja remover este item do carrinho?",
                                        " ",
                                        [
                                            {
                                                text: 'Cancelar',
                                                onPress: () => {}
                                            
                                            },
                                            {
                                                text: 'Sim',
                                                onPress: () => {remove(item.id, amount, item.price), Alert.alert(
                                                    "Item removido com sucesso",
                                                    "",
                                                    [
                                                        {
                                                            text: 'OK',
                                                            onPress: () => navigation.navigate("homeDrawer")
                                                        }
                                                    ]
                                                    )}
                                            }
                                        ]
                                    )

                                }
                                return (
                                    <View style={{flexDirection: 'row',borderColor: "#E1E1E1", borderTopWidth: 1, borderBottomWidth: 1}} key={index}>
                                        <View style={styles.header} >
                                            <Image
                                                source={{uri: item.image1}}
                                                style={styles.image}
                                                resizeMode='contain'
                                            />
                                            <View>
                                                <View style={{width: 200}}>
                                                    <Text style={styles.name} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                                    <Text style={styles.priceBag}>R$ {item.price}</Text>
                                                </View>
                                                <View style={styles.footer}>
                                                    <TouchableOpacity style={styles.button} onPress={()=> strip()}>
                                                        <Text style={styles.pressButton}>-</Text>
                                                    </TouchableOpacity>
                                                    <View style={styles.amountTxt}>
                                                        <Text 
                                                        style={styles.text}  
                                                        >{amount}</Text>
                                                    </View>
                                                    <TouchableOpacity style={styles.button} onPress={() => sum()}>
                                                        <Text style={styles.pressButton}>+</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.remove} onPress={() => removeItem()}>
                                            <IconM name="delete" size={30} color="red"/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })
                        }   
                    </View> 
                </ScrollView>
            </View>
            <View style={{flexDirection:'row', width: '100%', height: '10%'}}>
                <View style={styles.viewPrice}>
                    <Text style={styles.price}>Total</Text>
                    <Text style={styles.price}>R$ {total},00</Text>
                </View>
                <TouchableOpacity style={styles.bottonCont} onPress={()=> irFinish()}>
                    <Text style={styles.cont}>Continuar</Text>
                </TouchableOpacity>
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
    header:{
        backgroundColor: 'white',
        height: 190,
        width: "90%",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20 
    },
    image:{
        height: 110, 
        width: "35%",
        marginRight: 30,
        marginBottom: 55
    },
    name:{
        fontSize: 20,
        color: 'black',
        marginBottom: 30,
        fontFamily: 'Montserrat-Medium'
    },
    priceBag:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat-Medium'
    },
    footer:{
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 25
    },
    button:{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#A8A2A2',
        borderWidth: 0.7
    },
    pressButton:{
        fontSize:15,
        color: "black",
        fontFamily: 'Montserrat-Medium'
    },
    text:{
        fontSize:15,
        color: "black",
        fontFamily: 'Montserrat-Regular'
    },
    amountTxt:{
        width: 30,
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: 'black',
        borderColor: '#A8A2A2',
        borderTopWidth: 0.7,
        borderBottomWidth: 0.7
    },
    viewPrice:{
        backgroundColor: 'white',
        height: "100%",
        width: "50%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    price:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold'
    },
    bottonCont:{
        height: "100%",
        width: "50%",
        backgroundColor: "#4E66EB",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cont:{
        fontSize: 23,
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    remove:{
        width: "10%",
        marginTop: 15,
        height: 50
    }   
})
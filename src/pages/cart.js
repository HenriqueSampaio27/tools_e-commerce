import { useNavigation } from "@react-navigation/native"
import React, {useEffect, useState} from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'
import {useBag} from '../context/cartContext'

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
            navigation.navigate('finish', {cartBag: cartBag, screen: 'cart', dateSold: route.params?.dateSold})
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
            <ScrollView style={{backgroundColor: "#D7D7D7", width: '100%', height: '90%'}} showsVerticalScrollIndicator={false}>
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
                            remove(item.id, amount, item.price)
                            Alert.alert(
                                "Item removido com sucesso!",
                                " ",
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('home')
                                    }
                                ]
                            )
                        }
                        return (
                            <View style={{flexDirection: 'row'}} key={index}>
                                <View style={styles.header} >
                                    <Image
                                        source={{uri: item.image1}}
                                        style={styles.image}
                                        resizeMode='contain'
                                    />
                                <View>
                                    <View style={{width: 200}}>
                                        <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                        <Text style={styles.priceBag}>R$ {item.price},00</Text>
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
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }    
            </ScrollView>
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
    header:{
        backgroundColor: 'white',
        height: 190,
        width: "90%",
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        marginBottom: 10
    },
    image:{
        height: 110, 
        width: "35%",
        marginEnd: 30,
        marginBottom: 55
    },
    title:{
        fontSize: 20,
        color: 'black',
        marginBottom: 30
    },
    priceBag:{
        fontSize: 20,
        color: 'black'
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
        elevation: 2,
        alignItems: 'center',
        borderColor: 'black'
        
    },
    pressButton:{
        fontSize:15,
        color: "black",
    },
    text:{
        fontSize:15,
        color: "black"
    },
    amountTxt:{
        width: 30,
        height: 20,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        borderColor: 'black'  
    },
    viewPrice:{
        backgroundColor: 'white',
        height: "100%",
        width: "50%",
        alignItems: 'center',
        paddingTop: 10
    },
    price:{
        fontSize: 20,
        color: 'black',
        fontWeight: '500'
    },
    bottonCont:{
        height: "100%",
        width: "50%",
        backgroundColor: "red",
        flex: 1,
        alignItems: 'center',
        paddingTop: 20
    },
    cont:{
        fontSize: 22,
        color: 'white',
        fontWeight: '600'
    },
    remove:{
        backgroundColor: "red",
        height: 190,
        width: "10%",
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }   
})
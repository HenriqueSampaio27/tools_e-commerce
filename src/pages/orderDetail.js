import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import MapProgress from "../componets/MapProggress";
import IconF from "react-native-vector-icons/Foundation"

export default function OrderDetail({route}){
    
    const navigation = useNavigation()
    const[date2, setDate2] = useState(route.params?.date)
    
    const orderNumber = "543645533653"
    const address = "nfoiwnfiwefnwoeifklndwsvjknsvjdfvnsdvdkv"
    const deliveryDate = "28/09/2023"
    const valorProduct = "293,00"
    const Subtotal = "100,00"
    const frete = "50,00"
    const payment = "BANCO BRADESCO [*6532] - Parcelado 2x"

    const mapProggress = [
        { title: 'Pedido entregue', isCurrent: false },
        { title: 'Em transporte', isCurrent: false },
        { title: 'Entregue a transportadora', isCurrent: false },
        { title: 'Nota fiscal disponível', isCurrent: false },
        { title: 'Pagamento confirmado', isCurrent: true }
    ];

    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white" style={{marginLeft: 15}}/>
                </TouchableOpacity>
                <Text style={styles.title}>Detalhes do pedido</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                <ScrollView style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, paddingBottom: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        <View style={styles.headerDetail}>
                            <Text style={styles.info}>Dados da entrega</Text>
                            <Text style={styles.orderNumber}>Número do pedido {"\t\t"}{orderNumber}</Text>
                            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 1, marginBottom: 15, marginTop: 8}}></View>
                            <Text style={styles.orderNumber}>Endereço</Text>
                            <Text style={styles.address}>{address}</Text>
                            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 1, marginBottom: 15, marginTop: 8}}></View>
                            <Text style={styles.deliveryDate}>Previsão de entrega - {deliveryDate}</Text>
                            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 1, marginBottom: 15, marginTop: 8}}></View>

                            <View style={{height: 450, width: '90%'}}>
                                <MapProgress data={mapProggress}/>
                            </View>
                        </View>

                        <View style={styles.headerDetail2}>
                            {date2.map((item, index) => {
                                return(
                                    <View style={styles.orderItem} key={index}>
                                        <Image source={{uri: item.image1}} style={styles.image}/>
                                        <View>
                                            <Text style={styles.nameProduct} numberOfLines={2} ellipsizeMode={"tail"}>{item.name}</Text>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={styles.priceProduct}>R$ {item.price}</Text>
                                                <Text style={styles.amountProduct}>x{item.soldAmount}</Text>   
                                            </View>
                                        </View>
                                        
                                    </View>
                                )
                            })}
                            <View style={{flexDirection: 'row', width: '90%'}}>
                                <Text style={styles.subtotal}>Subtotal dos produtos</Text>  
                                <Text style={styles.subtotalPrice}>R$ {Subtotal}</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: '90%'}}>
                                <Text style={styles.frete}>Taxa do frete</Text>
                                <Text style={styles.totalFrete}>R$ {frete}</Text>
                            </View>
                            <View style={{flexDirection: 'row', width: '90%'}}>
                                <Text style={styles.total}>Total</Text>
                                <Text style={styles.totalPrice}>R$ {valorProduct}</Text>
                            </View>  
                        </View>

                        <View style={styles.headerDetail2}>
                            <View style={{flexDirection: 'row', alignItems: "center", marginBottom: 10, marginTop: 10}}>
                                <IconF name="dollar" color={"#2799F3"} size={35}/>
                                <Text style={styles.payment}>Método de pagamento</Text>
                            </View>
                            <Text style={styles.paymentmethod} numberOfLines={2} ellipsizeMode={"tail"}>{payment}</Text>
                        </View>
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
        width: "75%",
        marginLeft: 45,
        fontSize: 20
    },
    headerDetail:{
        width: '90%',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 15
    },
    info:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
        width: '90%',
        marginBottom: 25,
        marginTop: 10
    },
    orderNumber:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 17,
        width: '90%'
    },
    address:{
        color: '#837F7F',
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        width: '90%'
    },
    deliveryDate:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        width: '90%',
        marginBottom: 5
    },
    headerDetail2:{
        width: '90%',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25
    },
    orderItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
        width: '90%',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
    },
    image:{
        height: 100,
        width: 100
    },
    nameProduct:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 19,
        color: 'black',
        width: '73%',
        marginLeft: 10,
        marginBottom: 15
    },
    priceProduct:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 19,
        color: 'black',
        width: '50%',
        marginLeft: 10,
        marginBottom: 15
    },
    amountProduct:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 19,
        color: 'black',
        width: '40%',
        marginLeft: 10,
        marginBottom: 15
    },
    subtotal:{
        color: "#808080",
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginTop: 25,
        width: "70%"
    },
    subtotalPrice:{
        color: "#808080",
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginTop: 25,
        width: "30%",
        textAlign: 'right'
    },
    frete:{
        color: "#808080",
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginTop: 10,
        width: "70%"
    },
    totalFrete:{
        color: "#808080",
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginTop: 10,
        width: "30%",
        textAlign: 'right'
    },
    total:{
        color: "black",
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
        marginTop: 10,
        width: "60%",
        marginBottom: 25
    },
    totalPrice:{
        color: "black",
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
        marginTop: 10,
        width: "40%",
        textAlign: 'right'
    },
    payment:{
        color: "black",
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
        width: "80%",
        marginLeft: 10,
        
    },
    paymentmethod:{
        color: "#837F7F",
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        width: "90%",
        marginBottom: 10
    }
})

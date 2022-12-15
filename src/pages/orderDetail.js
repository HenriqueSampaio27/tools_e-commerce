import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";
import MapProgress from "../componets/MapProggress";
import OrderItem from "../componets/OrderItem";

export default function OrderDetail({route}){
    
    const[date, setDate] = useState(tools)
    const navigation = useNavigation()
    
    const orderNumber = "543645533653"
    const address = "nfoiwnfiwefnwoeifklndwsvjknsvjdfvnsdvdkv"
    const deliveryDate = "28/09/2023"

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
                            <TouchableOpacity style={styles.map}>
                                <Text style={styles.mapText}>Acompanhar no mapa</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerDetail2}>

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
    map:{
        width: "80%",
        height: 45,
        backgroundColor: '#2799F3',
        marginBottom: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mapText:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 17,
        color: 'white'
    },
    headerDetail2:{
        width: '90%',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25
    }
})

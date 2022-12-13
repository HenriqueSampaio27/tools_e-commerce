import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";

export default function RequestDrawer(){
    
    const[date, setDate] = useState(tools)
    const navigation = useNavigation()
    
    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Pedidos</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                <ScrollView style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}} showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 50, paddingBottom: 50, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        
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
    }
})

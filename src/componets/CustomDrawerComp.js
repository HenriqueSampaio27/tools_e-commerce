import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer"
import IconI from 'react-native-vector-icons/Ionicons'

export default function CustomDrawerComp(props){
    
    const name = "Pedro Henrique"
    const email = "henriquesampaioabreu123@gmail.com"

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={{backgroundColor: '#2799F3'}}>
                <View style={styles.header}>
                    <Text numberOfLines={2} style={styles.name}>Olá, {"\n"}{name} !</Text>
                    <Text numberOfLines={2} style={styles.email}>{email}</Text>
                </View>
                <View style={{backgroundColor: 'white', paddingTop: 10}}>
                <DrawerItemList {...props}/>
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity style={styles.footer} onPress={() => {}}>
                <IconI name="exit-outline" size={30} color={"black"}/>
                <Text style={{color: 'black', fontFamily: 'Montserrat-Medium', fontSize: 18, marginLeft: 15}}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height: 140,
        backgroundColor: '#2799F3'
    },
    name:{
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 18
    },
    email:{
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        marginLeft: 15,
        marginTop: 8,
        marginRight: 18
    },
    footer:{
        flexDirection: 'row', 
        paddingLeft: 20, 
        paddingBottom: 10, 
        paddingTop: 5, 
        alignItems: 'center', 
        borderColor: '#ccc', 
        borderTopWidth: 1
    }
})
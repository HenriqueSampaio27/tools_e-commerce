import React from "react";
import {Image, Text, View, StyleSheet, ScrollView} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer"

export default function CustomDrawerComp(props){
    
    const {navigation} = props;
    const name = "Pedro Henrique"
    const email = "henriquesampaioabreu123@gmail.com"

    return (
            <View>
                <View style={styles.header}>
                <Text numberOfLines={2} style={styles.name}>Olá, {"\n"}{name} !</Text>
                <Text numberOfLines={2} style={styles.email}>{email}</Text>
            </View>
            
            <View style={styles.items}>
            <DrawerContentScrollView {...props}>
            <DrawerItem
                label="homeDrawer"
                onPress={() => navigation.navigate('cart')}
                style={styles.pages}
            />
            
            </DrawerContentScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        height: "38%",
        backgroundColor: '#2799F3'
    },
    name:{
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 18
    },
    email:{
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 15,
        marginTop: 8,
        marginRight: 18
    },
    items:{
        flexDirection: 'row',
        backgroundColor: "white"
    },
    pages:{
        color: "blue"
    }
})
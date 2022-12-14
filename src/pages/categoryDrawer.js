import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from "react-native"
import IconI from 'react-native-vector-icons/Ionicons'
import { tools } from "../../db";

export default function CategoryDrawer(){
    
    const[categoryItem, setCategoryItem] = useState(tools)
    const navigation = useNavigation()
    
    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Categorias</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%" }}>
                
                    <View style={{backgroundColor: 'white', height: "100%", paddingTop: 30, alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                        <FlatList 
                            vertical
                            data={categoryItem}
                            numColumns={2}
                            keyExtractor={item => item.id}
                            renderItem={({item, index}) => 
                                {return(
                                    <TouchableOpacity style={styles.itens} key={index} onPress={() => {navigation.navigate("itemByCategory",{category: item.category})}}>
                                    <Text style={styles.name} numberOfLines={2} ellipsizeMode={'tail'}>{item.category}</Text>
                                    </TouchableOpacity>
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
    },
    itens:{
        flexDirection: 'row',
        borderColor: '#D7D7D7',
        borderWidth: 1,
        borderRadius: 20,
        width: '45%',
        height: 100,
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10
    },
    name:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginLeft: 8,
        width: '75%'
    }
})
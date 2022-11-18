import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import IconZ from 'react-native-vector-icons/Zocial'
import IconI from 'react-native-vector-icons/Ionicons'
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword(){

    const[email, setEmail] = useState("")
    const navigation = useNavigation()

    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "85%"}}>
                <ScrollView style={{backgroundColor: 'white', height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50,}}>
                    <View style={styles.header}>
                        <Text style={styles.forgot}>Esqueceu sua senha?</Text>
                        <Text style={styles.information}>Para recuperar seu acesso, preencha o campo com o email cadastrado</Text>
                        <View style={styles.headerInput}>
                            <IconZ name="email" size={20} color="black"/>
                            <TextInput 
                            style={styles.input}
                            placeholder= "Email cadastrado"
                            placeholderTextColor={"#898787"}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            autoCapitalize={"none"}
                            ></TextInput>
                        </View>
                        
                        <TouchableOpacity style={styles.buttonRecover} onPress={() => CreateUser()}>
                            <Text style={styles.textLogin}>Recuperar senha</Text>
                        </TouchableOpacity>
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
        height: "15%",
        backgroundColor: '#2799F3'
    },
    back:{
        width: "80%",
        
    },
    header:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '100%'
    },
    forgot:{
        marginTop: 25,
        marginBottom: 5,
        width: '100%',
        marginLeft: 50,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18
    },
    information:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        width: '85%',
        marginTop: 15,
        marginRight: 20,
        marginBottom: 35
    },
    input:{
        padding: 15,
        color: 'black',
        fontSize: 15,
        fontFamily: "Montserrat-SemiBold",
        backgroundColor: "#E1E1E1",
        width: "90%"   
    },
    headerInput:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        paddingLeft: 18,
        backgroundColor: "#E1E1E1",
        borderRadius: 20,
        marginBottom: 16
    },
    buttonRecover:{
        marginTop: 40,
        marginBottom: 20,
        width: "90%",
        height: 55,
        backgroundColor: '#4E66EB',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    textLogin:{
        fontSize: 25,
        fontFamily: "Montserrat-Bold",
        color: 'white',
    }
})
import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import { firebase } from "../connection/firebaseConnection";
import { useNavigation } from "@react-navigation/native";
import {TextInputMask} from 'react-native-masked-text'
import IconZ from 'react-native-vector-icons/Zocial'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/Entypo'
import IconI from 'react-native-vector-icons/Ionicons'
import IconF from 'react-native-vector-icons/Foundation'
import IconFa from 'react-native-vector-icons/FontAwesome5'


export default function Registration(){
    
    const[hidePass, setHidePass] = useState(true)
    const[email, setEmail] = useState("")
    const[name, setName] = useState("")
    const[lastName, setLastName] = useState("")
    const[telephone, setTelephone] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError]= useState("")

    const navigation = useNavigation()

    function CreateUser(){
        if(email != "" && name != "" && lastName!= "" && password != "" && telephone != ""){
            /*const auth = getAuth()
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode)
                    console.log(errorMessage)
                });*/
            alert("usuario cadastrado!")
            navigation.navigate('home')
        }else{
            setError("Preencha todos os campos!")
        }
    }

    return (
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Registro</Text>
            </View>
            <ScrollView style={{backgroundColor: '#2799F3'}}>
                <View style={styles.header}>
                    <Text style={styles.information}>Insira seus dados para cadastro</Text>
                    <View style={styles.headerInput}>
                        <IconFa name="user" size={20} color="black"/>
                        <TextInput 
                        style={styles.input}
                        placeholder= "Nome"
                        placeholderTextColor={"#898787"}
                        keyboardType="default"
                        onChangeText={(text) => setName(text)}
                        value={name}
                        ></TextInput>
                    </View>
                    <View style={styles.headerInput}>
                        <IconFa name="user" size={20} color="black"/>
                        <TextInput 
                        style={styles.input}
                        placeholder= "Sobrenome"
                        placeholderTextColor={"#898787"}
                        keyboardType="default"
                        onChangeText={(text) => setLastName(text)}
                        value={lastName}
                        ></TextInput>
                    </View>
                    <View style={styles.headerInput}>
                        <IconF name="telephone" size={20} color="black"/>
                        <TextInputMask 
                        style={styles.input}
                        type="cel-phone"
                        options={{
                            maskType:"BRL",
                            withDDD: true,
                            dddMask: "(99) "
                        }}
                        placeholder= "Telefone"
                        placeholderTextColor={"#898787"}
                        onChangeText={(text) => setTelephone(text)}
                        value={telephone}
                        />
                    </View>
                    <View style={styles.headerInput}>
                        <IconZ name="email" size={20} color="black"/>
                        <TextInput 
                        style={styles.input}
                        placeholder= "Email"
                        placeholderTextColor={"#898787"}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        ></TextInput>
                    </View>
                    <View style={styles.headerInput}>
                        <IconM name="key" size={20} color="black"/> 
                        <TextInput 
                        style={styles.inputPassword}
                        placeholder= "Senha"
                        placeholderTextColor={"#898787"}
                        keyboardType="default"
                        secureTextEntry= {hidePass}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        ></TextInput>
                        <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                            {hidePass? <IconE name="eye" size={20} color="#898787"/>:
                            <IconE name="eye-with-line" size={20} color="#898787"/>}
                        </TouchableOpacity>
                    </View>

                    {
                        (error === "")? <View/> : <View style ={{flexDirection: "row"}}> 
        
                        <Text style = {styles.error}>{error}</Text>
                        </View>
                    }
                    
                    <TouchableOpacity style={styles.buttonLogin} onPress={() => CreateUser()}>
                        <Text style={styles.textLogin}>Cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.google} onPress={() => {}}>
                        <Image
                        style={{width: 40, height: 40}}
                        source={require("../assets/image/icon_google.png")}
                        resizeMode= 'contain'
                        />   
                        <Text style={styles.textGoogle}>Continuar com o Google</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>  
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
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        height: '100%'
    },
    information:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 17,
        width: '100%',
        marginTop: 25,
        marginLeft: 50,
        marginBottom: 18
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
    inputPassword:{
        padding: 15,
        fontSize: 15,
        fontFamily: "Montserrat-SemiBold",
        color: 'black',
        backgroundColor: "#E1E1E1",
        width: "80%",
        borderRadius: 20 
    },
    icon:{
        width: "15%",
        alignItems: "center",
        justifyContent: 'center'
    },
    error:{
        width: "100%",
        marginLeft: 50,
        color: 'red',
        fontSize: 13,
        fontFamily: "Montserrat-Regular"
    },
    buttonLogin:{
        marginTop: 40,
        marginBottom: 5,
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
    },
    google:{
        backgroundColor: 'white',
        width: "90%",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 55,
        padding: 2,
        marginTop: 25,
        marginBottom: 120,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "#888686"
    },
    textGoogle:{
        color: '#888686',
        fontSize: 18,
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20
    }
})
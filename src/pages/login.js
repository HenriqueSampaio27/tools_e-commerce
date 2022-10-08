import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { useNavigation } from "@react-navigation/native"
import { firebase } from "../connection/firebaseConnection";

export default function Login(){

    const navigation = useNavigation()
    const auth = getAuth(firebase)
    //const provider = new GoogleAuthProvider()

    const[hidePass, setHidePass] = useState(true)
    const[progress, setProgress] = useState(false)
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError]= useState("")

    let stylesButtonLogin
    let disabled
    function stylesButton(){
        if(email == "" || password == ""){
            stylesButtonLogin = styles.bottonLoginEmpty
            disabled = true
        }else if(!email == "" && !password == ""){
            stylesButtonLogin = styles.bottonLoginFilled
            disabled = false
        }
    }
    stylesButton()

    async function verificationLogin(){
        let success
        setProgress(true)
        
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            success = true

        })
        .catch((error) => {
            setProgress(false)
            if(error.code == "auth/invalid-email"){
                setError("Email inválido")
            }else if(error.code == "auth/wrong-password"){
                setError("Senha incorreta")
            }else if(error.code == "auth/network-request-failed"){
                setError("Sem conexão com a internet")
            }else{
                setError("Falha ao realizar o login")
            }
            
        });
        if(success == true){
            navigation.navigate("home")
        }   
    }

    /*async function loginWithGoogle(){
        
        await signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken
            const user = result.user
            console.log("sucesso")
            console.log(result)
        }).catch((error) => {
            
            const errorCode = error.code;
            const errorMessage = error.message;
            
            const email = error.customData.email;
            console.log("error")
            console.log(error)
            const credential = GoogleAuthProvider.credentialFromError(error); 
        });

    }

    /*useEffect(() => {
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("home")
                const uid = user.uid;
            }
        });
    }, [])*/

    return(
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.header}>
                <Image
                source={require("../assets/image/KingTools.png")}
                style={styles.image}
                resizeMode= "contain"
                />
                <TextInput 
                style={styles.inputEmail}
                placeholder= "Email"
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                value={email}
                ></TextInput>
                <View style={styles.headerPassword}>
                    <TextInput 
                    style={styles.inputPassword}
                    placeholder= "Senha"
                    keyboardType="default"
                    secureTextEntry= {hidePass}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    ></TextInput>
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                            
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.config}>
                    <Text style={styles.textConfig}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.config} onPress={()=>navigation.navigate("registration")}>
                    <Text style={styles.textConfig}>Criar conta</Text>
                </TouchableOpacity>
                {
                    (error === "")? <View/> : <View style ={{flexDirection: "row"}}> 
    
                    <Text style = {styles.error}>{error}</Text>
                    </View>
                }
                <TouchableOpacity style={stylesButtonLogin} disabled ={disabled} onPress={verificationLogin}>
                    <Text style={styles.textLogin}>Entrar</Text>
                </TouchableOpacity>

                <View style={{flexDirection: "row", marginTop: 20}}>
                    <View style={{backgroundColor: '#898787', width: 50, height: 1, marginTop: 12, marginRight: 5}}></View>
                    <Text style={{color: "#898787", fontSize: 15}}>ou</Text>
                    <View style={{backgroundColor: '#898787', width: 50, height: 1, marginTop: 12, marginLeft: 5}}></View>
                </View>
                
                <TouchableOpacity style={styles.google} >
                    <View style={{backgroundColor: 'white', width: '20%', alignItems: 'center', justifyContent: "center"}}>
                        <Image
                        source={require("../assets/image/icon_google.png")}
                        resizeMode= 'contain'
                        />
                    </View>    
                    <View style={{alignItems: 'center', justifyContent: 'center', width: '80%'}}>
                        <Text style={styles.textGoogle}>Continuar com o Google</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{
        alignItems: "center",
        justifyContent: 'center'
    },
    image:{
        marginTop: 50,
        marginBottom: 30,
        height: 240,
        width: 240
    },
    inputEmail:{
        padding: 12,
        paddingLeft: 17,
        fontSize: 18,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 0.5,
        width: "90%",
        marginBottom: 10   
    },
    headerPassword:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        borderRadius: 20,
        borderColor: "black",
        borderWidth: 0.5
    },
    inputPassword:{
        padding: 12,
        fontSize: 18,
        backgroundColor: "white",
        width: "85%",
        borderRadius: 20,
        marginLeft: 5   
    },
    icon:{
        width: "15%",
        height: 50,
        alignItems: "center",
        justifyContent: 'center'
    },
    config:{
        width: "90%",
        marginTop: 5,
        marginLeft: 10
    },
    textConfig:{
        color: 'blue',
        fontSize: 13
    },
    error:{
        color: 'red',
        fontSize: 13
    },
    bottonLoginFilled:{
        marginTop: 12,
        marginBottom: 5,
        width: "90%",
        height: 55,
        backgroundColor: 'red',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    bottonLoginEmpty:{
        marginTop: 12,
        marginBottom: 10,
        width: "90%",
        height: 55,
        backgroundColor: 'gray',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center' 
    },
    textLogin:{
        fontSize: 25,
        color: 'white',
        fontWeight: '600'
    },
    google:{
        backgroundColor: '#2799F3',
        width: "90%",
        flexDirection: 'row',
        height: 55,
        padding: 2,
        marginTop: 40
    },
    textGoogle:{
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    }
})
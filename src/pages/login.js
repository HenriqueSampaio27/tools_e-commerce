import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { useNavigation } from "@react-navigation/native"
import { firebase } from "../connection/firebaseConnection";
import IconZ from 'react-native-vector-icons/Zocial'
import IconM from 'react-native-vector-icons/MaterialCommunityIcons'
import IconE from 'react-native-vector-icons/Entypo'

export default function Login(){

    const navigation = useNavigation()
    const auth = getAuth(firebase)
    const[loading, setLoading] = useState(false)
    //const provider = new GoogleAuthProvider()

    const[hidePass, setHidePass] = useState(true)
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError]= useState("")

    async function verificationLogin(){
        let success = false
        if(email != "" && password != ""){
            setLoading(true)
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
            }else{
                setLoading(false)
            } 
        }else{
            setError("Preencha todos os campos!")
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
        <View>
            <View style={styles.headerTitle}>
                <Text style={styles.title}>REI DAS</Text>
                <Text style={styles.title}>FERRAMENTAS</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "87%"}}>
                <ScrollView style={{backgroundColor: 'white', height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50,}}>
                        <View style={styles.header}>    
                            <Text style={styles.welcome}>Bem-vindo de volta</Text>
                            <Text style={styles.bottomWelcome}>Informe seu login</Text>
                        <View style={styles.headerInput}>
                            <IconZ name="email" size={20} color="black"/>
                            <TextInput 
                            style={styles.inputEmail}
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
                        
                        <TouchableOpacity style={styles.buttonLogin} onPress={() => verificationLogin()}>
                            <Text style={styles.textLogin}>Entrar</Text>
                        </TouchableOpacity>

                        {loading?<ActivityIndicator style={{marginTop: 10}} size={30} color="#4E66EB"/>: null}

                        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate("recoverPassword")}>
                            <Text style={styles.textForgotPassword}>Esqueceu a senha?</Text>
                        </TouchableOpacity>
                        
                        <View style={{flexDirection: "row", marginTop: 35, width: '90%'}}>
                            <View style={styles.viewLeft}></View>
                            <Text style={styles.text_ou}>ou</Text>
                            <View style={styles.viewRigth}></View>
                        </View>
                        
                        <TouchableOpacity style={styles.newAccount} onPress={()=>navigation.navigate("registration")}>
                            <Text style={styles.textnewAccount}>Criar conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.google} >
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
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "13%",
        backgroundColor: '#2799F3'
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        color: 'white',
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
    welcome:{
        marginTop: 25,
        marginBottom: 5,
        width: '100%',
        marginLeft: 50,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18
    },
    bottomWelcome:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        width: '100%',
        marginLeft: 50,
        marginBottom: 18
    },
    inputEmail:{
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
        marginBottom: 15
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
    forgotPassword:{
        marginTop: 15,
        marginLeft: 10
    },
    textForgotPassword:{
        color: '#929090',
        fontSize: 15,
        fontFamily: "Montserrat-SemiBold"
    },
    newAccount:{
        marginTop: 50,
        width: "90%",
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#888686",
        borderWidth: 0.5,
        borderRadius: 20
    },
    textnewAccount:{
        color: '#888686',
        fontSize: 18,
        fontFamily: "Montserrat-SemiBold"
    },
    error:{
        width: "100%",
        marginLeft: 50,
        color: 'red',
        fontSize: 13,
        fontFamily: "Montserrat-Regular"
    },
    buttonLogin:{
        marginTop: 8,
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
    viewLeft:{
        backgroundColor: '#929090', 
        width: "45%", 
        height: 1, 
        marginTop: 12
    },
    text_ou:{
        color: "#929090", 
        fontSize: 17,
        marginLeft: 5,
        marginRight: 5,
        fontFamily:"Montserrat-SemiBold"
    },
    viewRigth:{
        backgroundColor: '#929090', 
        width: "45%", 
        height: 1, 
        marginTop: 12,
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
        marginBottom: 20,
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
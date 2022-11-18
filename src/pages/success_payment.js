import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import {useNavigation} from '@react-navigation/native'
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from "react-native-vector-icons/MaterialCommunityIcons"
import IconF from 'react-native-vector-icons/Feather'

export default function Success_Payment({route}){

    const[check1, setCheck1] = useState(false)
    const[check2, setCheck2] = useState(false)
    const[check3, setCheck3] = useState(false)
    const[options, setOptions] = useState(route.params?.options)
    const[email, setEmail] = useState("pedroHenrique@gmail.com")
    const[card, setCard] = useState("")
    const[cvv, setCvv] = useState("")
    const[date, setDate] = useState("")
    const[name, setName] = useState("")
    const[error, setError] = useState(false)

    const navigation = useNavigation()

    function stylesSuccess(){
        if(options == "credit"){
            setCheck1(true)
        }else if(options == "boleto"){
            setCheck2(true)
        }else if(options == 'pix'){
            setCheck3(true)
        }
    }

    useEffect(() => {
        stylesSuccess()
    }, [route])
    
    return(
        <View>
            <View style={styles.conteiner}>
                <View style={styles.headerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconI name="chevron-back-circle" size={28} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Sucesso</Text>
                </View>
                <View style={{flexDirection: 'row', height: "70%", alignItems: 'center', justifyContent: "center"}}>
                    <View style={styles.viewScreen1}>
                    <Image
                    source={require("../assets/image/info.png")}
                    style={styles.imageIcon}
                    />
                    <Text style={styles.textScreen}>Info</Text>
                    </View>
                    <View style={styles.viewScreen2}>
                    <Image
                    source={require("../assets/image/payment.png")}
                    style={styles.imageIcon}
                    />
                    <Text style={styles.textScreen}>Pagamento</Text>
                    </View>
                    <View style={styles.viewScreen2}>
                    <Image
                    source={require("../assets/image/success.png")}
                    style={styles.imageIcon}
                    />
                    <Text style={styles.textScreen}>Sucesso</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "82%" }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: 'white', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View style={{backgroundColor: 'white', height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: 'center', justifyContent: 'center'}}>
                        <IconM name="verified" size={150} color="#00FF00" style={{borderColor: 'black' , borderWidth: 2, borderRadius: 200, paddingLeft: 5, paddingTop: 5, marginTop: 50}}/>
                        <Text style={styles.success}>Compra realizada{"\n"}com succeso!</Text>
                        {
                            check1? <View style={{width: '90%'}}>
                                <Text style={styles.confirmation}>Enviaremos uma {"\n"}confirmação de compra para {"\n"}{email}</Text>
                                <TouchableOpacity style={styles.footerMain} onPress={()=> navigation.navigate("drawer")}>
                                    <Text style={styles.titleFinish}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>: null
                        }
                        {
                            check2? <View style={{width: '90%'}}>
                                <Text style={styles.confirmation}>Enviaremos uma {"\n"}confirmação de compra para {"\n"}{email}</Text>
                                <TouchableOpacity style={styles.footerMain2} onPress={()=> Alert.alert("","código de barras copiado")}>
                                    <Text style={styles.titleFinish2}>Copiar código de barras</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.footerMain} onPress={()=> navigation.navigate("drawer")}>
                                    <Text style={styles.titleFinish}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>: null
                        }
                        {
                            check3? <View style={{width: '90%'}}>
                                <Text style={styles.confirmation}>Enviaremos uma {"\n"}confirmação de compra para {"\n"}{email}</Text>
                                <TouchableOpacity style={styles.footerMain2} onPress={()=> Alert.alert("","chave pix copiada")}>
                                    <Text style={styles.titleFinish2}>Copiar chave pix</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.footerMain} onPress={()=> navigation.navigate("drawer")}>
                                    <Text style={styles.titleFinish}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>: null
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    conteiner:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "18%",
        backgroundColor: '#2799F3'
    },
    headerTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "30%"
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        color: 'white',
        width: "75%",
        marginLeft: 35,
        fontSize: 22
    },
    viewScreen1:{
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewScreen2:{
        marginLeft: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageIcon:{
        height: 35,
        width: 35,
        marginBottom: 5
    },
    textScreen:{
        fontFamily: 'Montserrat-SemiBold',
        color: 'white'
    },
    success:{
        fontFamily: 'Montserrat-Bold',
        color: 'black',
        fontSize: 28,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 20
    },
    confirmation:{
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 50
    },
    footerMain:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E66EB',
        height: 55,
        marginTop: 30,
        borderRadius: 20
    },
    titleFinish:{
        fontSize: 25,
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    },
    footerMain2:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 45,
        marginTop: 30,
        borderRadius: 20,
        borderColor: '#4E66EB',
        borderWidth: 1.5,
        width: "80%",
        marginLeft: 30
    },
    titleFinish2:{
        fontSize: 20,
        color: '#4E66EB',
        fontFamily: 'Montserrat-SemiBold'
    }
})
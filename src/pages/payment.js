import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Alert} from 'react-native'
import {TextInputMask} from 'react-native-masked-text'
import {useNavigation} from '@react-navigation/native'
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from "react-native-vector-icons/MaterialCommunityIcons"
import IconF from 'react-native-vector-icons/Feather'

export default function Payment({route}){

    const[check1, setCheck1] = useState(false)
    const[check2, setCheck2] = useState(false)
    const[check3, setCheck3] = useState(false)
    const[options, setOptions] = useState("")
    const[card, setCard] = useState("")
    const[cvv, setCvv] = useState("")
    const[date, setDate] = useState("")
    const[name, setName] = useState("")
    const[error, setError] = useState(false)

    const navigation = useNavigation()

    function checkCredit(){
        setCheck1(true)
        setCheck2(false)
        setCheck3(false)
        setOptions("credit") 
    }
    function checkBoleto(){
        setCheck1(false)
        setCheck2(true)
        setCheck3(false)
        setOptions("boleto")
    }
    function checkPix(){
        setCheck1(false)
        setCheck2(false)
        setCheck3(true)
        setOptions("pix")
    }

    let stylecheck1
    let stylecheck2
    let stylecheck3
    function stylesCheckBox(){
        if(check1){
            stylecheck1 = styles.checkBox
            stylecheck2 = styles.checkBoxBlank
            stylecheck3 = styles.checkBoxBlank
        }else if(check2){
            stylecheck1 = styles.checkBoxBlank
            stylecheck2 = styles.checkBox
            stylecheck3 = styles.checkBoxBlank
        }else if(check3){
            stylecheck1 = styles.checkBoxBlank
            stylecheck2 = styles.checkBoxBlank
            stylecheck3 = styles.checkBox
        }else{
            stylecheck1 = styles.checkBoxBlank
            stylecheck2 = styles.checkBoxBlank
            stylecheck3 = styles.checkBoxBlank
        }
    }
    stylesCheckBox()

    function payment(){
        if(options != ""){
            if(options == "credit"){
                if(card != "" && date != "" && cvv != "" && name != ""){
                    const isValid = this.datetimeField.isValid()
                    if(isValid){
                        setError(false)
                        Alert.alert(
                            "Confirmar Pagamento!",
                            "",
                            [
                                {
                                    text: "Cancelar",
                                    style: "cancel",
                                    onPress: () => {}
                                },
                                {
                                    text: "Sim",
                                    onPress: () => navigation.navigate()
                                }
                            ]
        
                        )
                    }else{
                        setError(true)
                        Alert.alert(
                            "Preencha com uma data válida!"
                        )                        
                    }
                }else{
                    Alert.alert(
                        "Preencha todos os campos!"
                    )
                } 
            }else{
                Alert.alert(
                    "Confirmar Pagamento!",
                    "",
                    [
                        {
                            text: "Cancelar",
                            style: "cancel",
                            onPress: () => {}
                        },
                        {
                            text: "Sim",
                            onPress: () => navigation.navigate()
                        }
                    ]

                )
                
            }
        }else{
            Alert.alert(
                "Selecione uma opção!"
            )
        }
    }
    console.log(options)
    return(
        <View>
            <View style={styles.conteiner}>
                <View style={styles.headerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconI name="chevron-back-circle" size={28} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Pagamento</Text>
                </View>
                <View style={{flexDirection: 'row', height: "70%", alignItems: 'center', justifyContent: "center"}}>
                    <View style={styles.viewScreen1}>
                    <Image
                    source={require("../assets/image/info.png")}
                    style={styles.imageIcon1}
                    />
                    <Text style={styles.textScreen}>Info</Text>
                    </View>
                    <View style={styles.viewScreen2}>
                    <Image
                    source={require("../assets/image/payment.png")}
                    style={styles.imageIcon1}
                    />
                    <Text style={styles.textScreen}>Pagamento</Text>
                    </View>
                    <View style={styles.viewScreen3}>
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
                        <Text style={styles.textInfo}>Informações sobre o pagamento</Text>
                        <TouchableOpacity style={stylecheck1} onPress={() => checkCredit()}>
                            {
                                check1? <IconMC name="checkbox-marked-circle-outline" size={24} color= "#4E66EB"/> :
                                <IconMC name="checkbox-blank-circle" size={24} color= "white"/> 
                            }
                            
                            <Text style={styles.textCheckBox}>Cartão de credito</Text>
                            
                        </TouchableOpacity>
                        {
                            check1? <View style={{width: '90%'}}>
                                <Text style={styles.textDescription}>Número do cartão</Text>
                                <View style={{flexDirection: "row", borderColor: '#E1E1E1', borderBottomWidth: 1, marginBottom: 5, height: 38}}>
                                    <TextInputMask
                                    type="credit-card"
                                    style={styles.inputMaskCard}
                                    onChangeText={(text) => setCard(text)}
                                    value={card}
                                    ></TextInputMask>
                                    <Image source={require("../assets/image/credit_elo.png")}
                                    style={{width: 40, height: 22, marginTop: 8, marginLeft: 25}}
                                    />
                                </View>
                                <View style={{flexDirection: "row", marginTop: 20}}>
                                    
                                    <View style={{borderColor: '#E1E1E1', borderBottomWidth: 1, marginBottom: 5, height: 50, width: "30%"}}>
                                        <Text style={styles.textDescription}>CVV</Text>
                                        <TextInput
                                        maxLength={3}
                                        keyboardType="numeric"
                                        style={styles.inputMask}
                                        onChangeText={(text) => setCvv(text)}
                                        value={cvv}
                                        ></TextInput>
                                    </View>
                                    
                                    <View style={[{borderBottomWidth: 1, marginBottom: 5, marginLeft: 35,height: 50, width: "60%"}, error?{ borderColor:'red'}: {borderColor: '#E1E1E1'}]}>
                                        <Text style={styles.textDescription}>Data de validade (MM/AA)</Text>
                                        <TextInputMask
                                        type="datetime"
                                        options={{
                                            format: 'MM/YY'
                                        }}
                                        style={styles.inputMask}
                                        onChangeText={(text) => setDate(text)}
                                        value={date}
                                        ref={(ref) => this.datetimeField = ref}
                                        ></TextInputMask>
                                    </View>
                                </View>
                                <View style={{borderColor: '#E1E1E1', borderBottomWidth: 1, marginBottom: 35, marginTop: 20, height: 50, width: "100%"}}>
                                    <Text style={styles.textDescription}>Nome no cartão</Text>
                                    <TextInput
                                    maxLength={50}
                                    keyboardType="default"
                                    style={styles.inputMask}
                                    onChangeText={(text) => setName(text)}
                                    value={name}
                                    ></TextInput>
                                </View>
                            </View>: null
                        }

                        <TouchableOpacity style={stylecheck2} onPress={() => checkBoleto()}>
                            {
                                check2? <IconMC name="checkbox-marked-circle-outline" size={24} color= "#4E66EB"/> :
                                <IconMC name="checkbox-blank-circle" size={24} color= "white"/> 
                            }
                            <Text style={styles.textCheckBox}>Boleto</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={stylecheck3} onPress={() => checkPix()}>
                            {
                                check3? <IconMC name="checkbox-marked-circle-outline" size={24} color= "#4E66EB"/> :
                                <IconMC name="checkbox-blank-circle" size={24} color= "white"/> 
                            }
                            <Text style={styles.textCheckBox}>Pix</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.footerMain} onPress={()=> payment()}>
                            <Text style={styles.titleFinish}>Finalizar</Text>
                        </TouchableOpacity>
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
    viewScreen3:{
        marginLeft: 60,
        opacity: 0.7,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageIcon1:{
        height: 35,
        width: 35,
        marginBottom: 5
    },
    imageIcon:{
        height: 35,
        width: 35,
        opacity: 0.7,
        marginBottom: 5
    },
    textScreen:{
        fontFamily: 'Montserrat-SemiBold',
        color: 'white'
    },
    textInfo:{
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        fontSize: 17,
        width: "90%",
        marginTop: 20,
        marginLeft: 20,
        marginBottom: 35
    },
    checkBoxBlank:{
        width: '90%',
        height: 55,
        backgroundColor: '#EBE8E8',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        borderColor: '#E1E1E1',
        borderWidth: 1

    },
    checkBox:{
        width: '90%',
        height: 55,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        borderColor: '#4E66EB',
        borderWidth: 1
    },
    textCheckBox:{
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        fontSize: 20,
        width: '80%',
        marginLeft: 10
    },
    inputMaskCard:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: 'black',
        width: '80%'
    },
    inputMask:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        color: 'black',
        marginBottom: 8
    },
    textDescription:{
        color: 'gray',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
    },
    footerMain:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E66EB',
        width: "90%",
        height: 55,
        marginTop: 30,
        borderRadius: 20
    },
    titleFinish:{
        fontSize: 25,
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    }
})
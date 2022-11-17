import React, {useState ,useEffect} from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native'
import { useNavigation } from "@react-navigation/native"
import IconI from 'react-native-vector-icons/Ionicons'
import Finish from "./info_pay"

export default function Address({route}){
    const[state, setState] = useState(false)
    const[cep, setCep] = useState('')
    const[logradouro, setLogradouro] = useState('')
    const[bairro, setBairro] = useState('')
    const[localidade, setLocalidade] = useState('')
    const[uf, setUf] = useState('')
    const[number, setNumber] = useState('')
    const[complemento, setComplemento] = useState()
    
    const[shipping, setShipping] = useState(0)
    const[date, setDate] = useState('')

    const navigation = useNavigation()
    
    function getDateCurrent(){
        const day = new Date().getDate()
        const month = new Date().getMonth()

        const monthName = ['Janeiro', 'Fevereiro', 'março', 'abril', 'Maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        if(month == 11){
            setDate(day + ' de ' + monthName[0])
        }else{
            setDate(day + ' de ' + monthName[month + 1])
        }
    }

    async function recebeDados(cep){
        const checksCEP = /^[0-9]{8}$/
        
        if(checksCEP.test(cep)){
            let req = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            
            let res = await req.json()
            if(!("erro" in res)){
                setLogradouro(res.logradouro)
                setBairro(res.bairro)
                setLocalidade(res.localidade)
                setUf(res.uf)
                setState(true)
            }else{
                clear()
                Alert.alert(
                    'CEP não encontrado!',
                    'Digite um CEP existente'
                    )
            }
        }else{
            clear()
            Alert.alert(
                'Formato de CEP inválido!',
                'Digite um CEP válido no Formato `00000000`'
                )
        }
    }

    function clear(){
        setState(false)
        setCep('')
        setBairro('')
        setLocalidade('')
        setLogradouro('')
        setUf('')
        setComplemento('')
        setNumber('')
        setShipping(0)
    }
    
    function passAddress(){
        if(cep.length == 8){
            if(number != ''){
                navigation.navigate("info_pay", {cep: cep, place: logradouro, bairro: bairro, localidade: localidade, uf: uf, number: number, shipping: shipping, date: date, 
                    image1: route.params?.image1, image2: route.params?.image2, image3: route.params?.image3, 
                    name:route.params?.name, price:route.params?.price, description:route.params?.description, cartBag: route.params?.cartBag, screen: 'address'})
            }else{
                Alert.alert(
                    'Campo N° obrigatório!',
                    'Digite o número do endereço'
                )    
            }
        }else{
            Alert.alert(
                'Nenhum endereço buscado!',
                'Digite o CEP'
            )
        }
    }

    function calcShipping(){
        switch(cep[0]){
            case '0': 
                setShipping(15)
                break
            case '1':
                setShipping(23)
                break
            case '2': 
                setShipping(25)
                break
            case '3':
                setShipping(28)
                break
            case '4': 
                setShipping(30)
                break
            case '5':
                setShipping(35)
                break
            case '6': 
                setShipping(50)
                break
            case '7':
                setShipping(20)
                break
            case '8': 
                setShipping(42)
                break
            case '9':
                setShipping(46)
                break                    
        }
    }
    
    return(
        <View>
            <View style={styles.headerTitle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <IconI name="chevron-back-circle" size={28} color="white"/>
                </TouchableOpacity>
                <Text style={styles.title}>Endereço</Text>
            </View>
            <View style={{backgroundColor: '#2799F3', height: "88%"}}>
                <ScrollView style={{backgroundColor: 'white', height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.header}>
                            <Text style={styles.info}>Informe seu endereço</Text>
                            <TextInput 
                                onChangeText={text =>{ 
                                    setCep(text)
                                    if(text.length == 8){
                                        recebeDados(text)
                                        calcShipping()
                                        getDateCurrent() 
                                    }
                                }}
                                maxLength = {8}
                                style={styles.input}
                                placeholderTextColor= '#808080' 
                                placeholder="Digite seu CEP"
                                keyboardType="numeric"
                                value = {cep}
                                >
                            </TextInput>
                            <TextInput 
                                style={styles.input}
                                onChangeText={(text) => setLogradouro(text)}
                                placeholderTextColor= '#808080' 
                                placeholder="Logradouro"
                                keyboardType="default"
                                value = {logradouro}
                                >
                            </TextInput>
                            <TextInput 
                                style={styles.input}
                                onChangeText={(text) => setBairro(text)}
                                placeholderTextColor= '#808080' 
                                placeholder="Bairro"
                                keyboardType="default"
                                value = {bairro}
                                >
                            </TextInput>
                            <TextInput 
                            style={styles.input} 
                            onChangeText={(text) => setNumber(text)}
                            keyboardType="numeric" 
                            placeholderTextColor= '#808080' 
                            placeholder= 'Nº'
                            value = {number}
                            > 
                            </TextInput>
                            <TextInput 
                                style={styles.input}
                                onChangeText={(text) => setLocalidade(text)}
                                placeholderTextColor= '#808080' 
                                placeholder="Cidade"
                                keyboardType="default"
                                value = {localidade}
                                >
                            </TextInput>
                            <TextInput 
                                style={styles.input}
                                onChangeText={(text) => setUf(text)}
                                placeholderTextColor= '#808080' 
                                placeholder="Estado"
                                keyboardType="default"
                                value = {uf}
                                >
                            </TextInput>
                            <TextInput 
                            style={styles.input}
                            onChange= {(text) => {setComplemento(text)}} 
                            placeholderTextColor= '#808080' 
                            placeholder= 'Complemento'
                            value = {complemento}
                            >
                            </TextInput>              
                        </View>

                        <View style={{width: "90%", alignItems: 'center', marginBottom: 20}}>
                        <TouchableOpacity style ={styles.buttonSave} onPress={() => passAddress()}>
                                <Text style={styles.textSave}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style ={styles.buttonClear} onPress={() => clear()}>
                                <Text style={styles.textClear}>Limpar</Text>
                            </TouchableOpacity>
                        </View>
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
    },
    header:{
        width: '100%',
        alignItems: 'center'
    },
    info:{
        fontSize: 16,
        color: 'black',
        fontFamily: "Montserrat-Medium",
        marginBottom: 25,
        marginTop: 28,
        width: '80%',
    },
    input:{
        backgroundColor: "#E1E1E1",
        color: "black", 
        fontSize: 15,
        fontFamily: "Montserrat-SemiBold",
        width: '90%',
        height: 55,
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 20

    },
    buttonSave:{
        width: "100%",
        height: 55,
        backgroundColor: '#4E66EB',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 25
    },
    textSave:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        color: 'white'
    },
    buttonClear:{
        width: "100%",
        height: 55,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 10,
        borderColor: '#4E66EB',
        borderWidth: 1.5
    },
    textClear:{
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 25,
        color: '#4E66EB',
    }
})
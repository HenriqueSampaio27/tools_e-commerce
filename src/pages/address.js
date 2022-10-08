import React, {useState ,useEffect} from "react"
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native'
import { useNavigation } from "@react-navigation/native"

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
    const screen = route.params?.screen
    function passAddress(){
        if(logradouro != ''){
        navigation.navigate(screen, {cep: cep, place: logradouro, shipping: shipping, date: date, txtShipping: true, 
                            image1: route.params?.image1, image2: route.params?.image2, image3: route.params?.image3, 
                            name:route.params?.name, price:route.params?.price, description:route.params?.description, screen: 'address', dateSold: route.params?.dateSold})
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
        <View style={styles.container}>
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
                    style={styles.imput}
                    placeholderTextColor= '#808080' 
                    placeholder="Digite seu Cep..."
                    keyboardType="numeric"
                    value = {cep}
                    >
                </TextInput>
                {state? <Text style={styles.setText}>{uf}</Text> : <Text style={styles.text}>Estado</Text>}
                {state? <Text style={styles.setText}>{localidade}</Text> : <Text style={styles.text}>Cidade</Text>}
                {state? <Text style={styles.setText}>{bairro}</Text> : <Text style={styles.text}>Bairro</Text>}
                {state? <Text style={styles.setText}>{logradouro}</Text> : <Text style={styles.text}>Rua</Text>}
                <TextInput 
                style={styles.imput} 
                keyboardType="numeric" 
                placeholderTextColor= '#808080' 
                placeholder= 'Nº'
                onChange={(text) => {setNumber(text)}}
                value = {number}
                > 
                </TextInput>
                <TextInput 
                style={styles.imput}
                onChange= {(text) => {setComplemento(text)}} 
                placeholderTextColor= '#808080' 
                placeholder= 'Complemento'
                value = {complemento}
                >
                </TextInput>              
            </View>
            <View style={{width: "100%", height: '7%', flexDirection: 'row'}}>
                <TouchableOpacity style ={styles.buttonClear} onPress={() => clear()}>
                    <Text style={styles.textClear}>Limpar</Text>
                </TouchableOpacity>
                <TouchableOpacity style ={styles.buttonSave} onPress={() => passAddress()}>
                    <Text style={styles.textSave}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#D7D7D7'
    },
    header:{
        width: '100%',
        height: '93%'
    },
    info:{
        fontSize: 14,
        color: 'black',
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 10
    },
    imput:{
        paddingLeft: 15,
        backgroundColor: "white",
        fontSize: 14,
        width: '100%',
        height: 40,
        marginBottom: 5,
        elevation: 2
    },
    text:{
        paddingLeft: 15,
        paddingTop: 10,
        backgroundColor: "white",
        fontSize: 14,
        width: '100%',
        height: 40,
        marginBottom: 5,
        color: '#808080',
        elevation: 2
    },
    setText:{
        paddingLeft: 15,
        paddingTop: 10,
        backgroundColor: "white",
        fontSize: 14,
        width: '100%',
        height: 40,
        marginBottom: 5,
        color: 'black',
        elevation: 2
    },
    buttonSave:{
        width: "50%",
        height: "100%",
        backgroundColor: 'red',
        alignItems: 'center'
    },
    textSave:{
        fontSize: 20,
        color: 'white',
        padding: 10
    },
    buttonClear:{
        width: "50%",
        height: "100%",
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textClear:{
        fontSize: 20,
        color: 'red',
        padding: 10
    }
})
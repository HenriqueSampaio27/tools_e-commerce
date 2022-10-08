import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {CheckBox} from 'react-native-elements'
import { useBag } from "../context/cartContext"
import db from "../connection/firebaseConnection"
import { deleteDoc, doc, setDoc } from "firebase/firestore"

export default function Finish({route}){
    
    const[sold, setSold] = useState([...route.params?.dateSold])
    const [soldAux, setSoldAux] = useState([])

    const[isSelected, setSelected] = useState(true)
    const[isSelected2, setSelected2] = useState(false)

    const[bag, setBag] = useState(route.params?.cartBag)
    const {total} = useBag()
    const {clearBag} =useBag()
    const {decrement} = useBag()
    const {increment} = useBag()
    const {amount} = useBag()
    
    const navigation = useNavigation()
    
    const[txtShipping, setTxtShipping] = useState(false)
    
    let totalWithShipping = 0
    if(route.params?.screen == 'detail' || route.params?.screen == 'address'){
        if(route.params?.shipping != undefined){
            totalWithShipping = parseInt(route.params?.price) + route.params?.shipping
        }else{
            totalWithShipping = parseInt(route.params?.price)
        }    
    }else if(route.params?.screen == 'cart' ||route.params?.screen == 'address'){
        if(route.params?.shipping != undefined){
            totalWithShipping = total + route.params?.shipping
        }else{
            totalWithShipping = total
        }
    }
    if(Number.isNaN(totalWithShipping)){
        totalWithShipping = total + route.params?.shipping
    }

    useEffect(() => {
        sync()
        let aux = []
        sold.map((item) => {
            aux.push(item.id)
        })
        setSoldAux([...aux])
    }, [route])

    function alertFinish(){
        Alert.alert(
            "Compra finalizada",
            "Tenha um bom dia!",
            [
                {
                    text: 'Obrigado!',
                    onPress: () => updateSold(bag)
                }
            ]
        )
    }

    function check1(){
        setSelected2(false)
        setSelected(true)
    }
    function check2(){
        setSelected2(true)
        setSelected(false)
    }

    function updateSold(bag){
        bag.map(async (item) => {
            const id = soldAux[Math.floor(Math.random() * soldAux.length)]
            if(sold.length >= 5 && !sold.includes(item.id)){
                await deleteDoc(doc(db, "sold", id))
                await setDoc(doc(db, "sold", item.id), {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    image1: item.image1,
                    image2: item.image2,
                    image3: item.image3
                })
                clearBag()
                navigation.navigate('home', {update: 'update'})
            }else if(!sold.includes(item.id)){   
                await setDoc(doc(db, "sold", item.id), {                    
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    image1: item.image1,
                    image2: item.image2,
                    image3: item.image3
                })
                clearBag()
                navigation.navigate('home', {update: 'update'})
            }else if(sold.includes(item.id)){
                clearBag()
                navigation.navigate('home', {update: 'update'})
            }
        })
        
    }

    function irAddress(){
        navigation.navigate('address', {screen: 'finish', image1: route.params?.image1, name: route.params?.name, price: route.params?.price})
    }

    
    
    function sync(){
        if(route.params?.cep == undefined){
            setTxtShipping(false)
        }else{
            setTxtShipping(route.params?.txtShipping)
        }
    }

    return(
        <View>
            <ScrollView style={{backgroundColor: '#D7D7D7', height: '92%'}} showsVerticalScrollIndicator= {false}>
                <View style={styles.header}>
                    <View>
                        <TouchableOpacity onPress={() => irAddress()} style={styles.imputArea}>
                            
                            {txtShipping? <Text 
                            style={styles.imput} 
                            numberOfLines={1} 
                            ellipsizeMode={'tail'}
                            >CEP:{route.params?.cep}, {route.params?.place}</Text> :
                            <Text style={styles.imput}>Busque seu endereço...</Text>}    
                            <Text style={styles.changeAddress}>Buscar</Text>
                        </TouchableOpacity>
                    
                    </View>    
                    {txtShipping? <Text style={{fontSize: 14}}>Chegará em {route.params?.date} por R$ {route.params?.shipping},00</Text> : 
                    
                    <Text style={{fontSize: 14}}>Informe seu endereço</Text>}
                </View>
                
                <View style={styles.bag}>
                    {
                        bag.map((item, index) => {
                            return (
                                <View style={styles.headerBag} key={index}>
                                    <Image
                                        source={{uri: item.image1}}
                                        style={styles.imageBag}
                                        resizeMode='contain'
                                    />
                                <View>
                                    <View style={{width: 200}}>
                                        <Text style={styles.titleBag} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                        <Text style={styles.priceBag}>R$ {item.price},00</Text>
                                    </View>   
                                </View>
                                </View>
                            )
                        })
                    }
                    <Text style={styles.total}>Total R$ {totalWithShipping},00</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.pay}>Forma de pagamento</Text>
                    <CheckBox
                    title="Boleto"
                    checkedIcon={"dot-circle-o"}
                    uncheckedIcon={"circle-o"}
                    checkedColor= "black"
                    uncheckedColor="#D7D7D7"
                    checked={isSelected}
                    onPress={()=> check1()}
                    />
                    <CheckBox
                    title="1x no cartão de credito"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor= "black"
                    uncheckedColor="#D7D7D7"
                    checked={isSelected2}
                    onPress={()=> check2()}
                    />
                </View>
            </ScrollView>
            
            <TouchableOpacity style={styles.footerMain} onPress={()=> alertFinish()}>
                <Text style={styles.titleFinish}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    header:{
        marginTop: 20,
        marginLeft: 24,
        marginRight: 20,
        marginBottom: 30,
        alignItems: 'center',
        height: 130,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 20
    },
    imputArea:{
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '99%',
        backgroundColor: '#D7D7D7',
        height: 40,
        borderRadius: 20,
        marginBottom: 18,
        marginTop: 5
    },    
    imput:{
        fontSize: 14,
        borderRadius: 20,
        width: '75%',
        marginLeft: 5,
        color: 'white'
    },
    changeAddress:{
        backgroundColor: 'red',
        color: 'white',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 6,
        paddingTop: 9,
        width: "20%"
    },
    bag:{
        marginLeft: 24,
        marginRight: 20,
        marginBottom: 25,
        paddingTop: 7,
        backgroundColor: "white",
        borderRadius: 20
    },
    total:{
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 15,
        color: 'black'
    },
    footer:{
        marginLeft: 24,
        marginRight: 20,
        marginBottom: 25,
        height: 200,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 20
    },
    pay:{
        fontSize: 19,
        color: 'black',
        marginBottom: 30,
        marginLeft: 15
    },    
    footerMain:{
        alignItems: 'center',
        backgroundColor: 'red',
        width: "100%",
        height: "8%"
    },
    titleFinish:{
        fontSize: 25,
        fontWeight: '600',
        marginTop: 12,
        color: 'white'
    },
    headerBag:{
        backgroundColor: 'white',
        height: 150,
        width: "100%",
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        marginTop: 10,
        marginBottom: 10
    },
    imageBag:{
        height: 110, 
        width: "35%",
        marginEnd: 30,
        marginBottom: 55
    },
    titleBag:{
        fontSize: 20,
        color: 'black',
        marginBottom: 30
    },
    priceBag:{
        fontSize: 20,
        color: 'black',
        marginBottom: 50
    },
    footerBag:{
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 25
    },
    buttonBag:{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        borderColor: 'black'
        
    },
    pressButtonBag:{
        fontSize:15,
        color: "black",
    },
    textBag:{
        fontSize:15,
        color: "black"
    },
    amountTxtBag:{
        width: 30,
        height: 20,
        backgroundColor: 'white',
        elevation: 2,
        alignItems: 'center',
        borderColor: 'black'
        
    } 
    
})
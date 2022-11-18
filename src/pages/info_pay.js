import react, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, Image} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {CheckBox} from 'react-native-elements'
import { useBag } from "../context/cartContext"
import db from "../connection/firebaseConnection"
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import IconI from 'react-native-vector-icons/Ionicons'
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from "react-native-vector-icons/MaterialCommunityIcons"

export default function Info_pay({route}){
    
    const[addressInfo, setaddressInfo] = useState(false)
    const[addressText, setaddressText] = useState(false)

    //const[sold, setSold] = useState([...route.params?.dateSold])
    const [soldAux, setSoldAux] = useState([])

    const[bag, setBag] = useState(route.params?.cartBag)
    const {total} = useBag()
    const {clearBag} =useBag()
    const {decrement} = useBag()
    const {increment} = useBag()
    const {amount} = useBag()
    
    const navigation = useNavigation()

    let addressDelivery = route.params?.place +", " + route.params?.number + ", " + route.params?.bairro + ", " + route.params?.localidade + ", " + route.params?.uf + ", " + route.params?.cep
    
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
        addressVerification()
    }, [route])

    function payment(){
        navigation.navigate("payment")
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
        navigation.navigate('address', {id: route.params?.id, image1: route.params?.image1, name: route.params?.name, price: route.params?.price, cartBag: route.params?.cartBag})
    }

    function addressVerification(){
        
        if(route.params?.cep != undefined){
            setaddressInfo(true)
        }else{
            setaddressInfo(false)
        }
        
    }

    return(
        <View>
            <View style={styles.conteiner}>
                <View style={styles.headerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconI name="chevron-back-circle" size={28} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Informações</Text>
                </View>
                <View style={{flexDirection: 'row', height: "70%", alignItems: 'center', justifyContent: "center"}}>
                    <View style={styles.viewScreen1}>
                    <Image
                    source={require("../assets/image/info.png")}
                    style={styles.imageIcon1}
                    />
                    <Text style={styles.textScreen}>Info</Text>
                    </View>
                    <View style={styles.viewScreen}>
                    <Image
                    source={require("../assets/image/payment.png")}
                    style={styles.imageIcon}
                    />
                    <Text style={styles.textScreen}>Pagamento</Text>
                    </View>
                    <View style={styles.viewScreen}>
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
                        <Text style={styles.textInfo}>Informações sobre o pedido</Text>
                        
                        <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 5}}></View>
                        <TouchableOpacity onPress={() => setaddressText(!addressText)} style={styles.addressButton}>    
                            <Text style={styles.addressTitle}>Endereço de entrega</Text>
                            {
                            addressText? 
                            <IconM name="keyboard-arrow-down" size={32} color="gray"/> : <IconM name="navigate-next" size={32} color="gray"/>    
                            }
                        </TouchableOpacity> 
                        {addressText?
                            <TouchableOpacity style={styles.addressButton} onPress={() => irAddress()}>
                                {addressInfo? <Text style={styles.addressInfo}>{addressDelivery}</Text>:
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.addressInfo}>Informe seu endereço</Text>
                                        <IconI name="information-circle" size={20} color="#EEAD2D"/>
                                    </View>}
                            </TouchableOpacity>: null}
                        <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 20, marginTop: 5}}></View>
                            {
                                bag.map((item, index) => {
                                    const [amount,setAmount] = useState(1)
                                    function sum(){
                                        if(amount < 20){
                                            const sum = amount + 1
                                            setAmount(sum)
                                            increment(item.price)
                                        }
                                    }
                                    function strip(){
                                        if(amount > 1){
                                            const strip = amount - 1
                                            setAmount(strip)
                                            decrement(item.price)
                                        }
                                    }

                                    return (
                                        <View style={styles.bag} key={index}>
                                            <View style={styles.headerBag} >
                                                <Image
                                                    source={{uri: item.image1}}
                                                    style={styles.imageBag}
                                                    resizeMode='contain'
                                                />
                                                <View>
                                                    <View style={{width: 200}}>
                                                        <Text style={styles.titleBag} numberOfLines={2} ellipsizeMode={'tail'}>{item.name}</Text>
                                                        <Text style={styles.priceBag}>R$ {item.price}</Text>
                                                    </View>   
                                                </View>
                                            </View>
                                            <View style={styles.amount}>
                                                <TouchableOpacity style={styles.button} onPress={()=> strip()}>
                                                    <Text style={styles.pressButton}>-</Text>
                                                </TouchableOpacity>
                                                <View style={styles.viewAmountTxt}>
                                                    <Text 
                                                    style={styles.textAmount}  
                                                    >{amount}</Text>
                                                </View>
                                                <TouchableOpacity style={styles.button} onPress={() => sum()}>
                                                    <Text style={styles.pressButton}>+</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        

                        <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 5}}></View>
                        
                        {addressInfo? 
                            <View style={{width: '90%'}}>      
                                <View style={{flexDirection: 'row'}}>
                                    <IconMC name="truck-fast" color={"#4E66EB"} size={30}/>
                                    <Text style={styles.fast}>Receba em casa</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.fastShipping}>em até {route.params?.date}</Text>
                                    <Text style={styles.valueShipping}>R$ {route.params?.shipping},00</Text>
                                </View>   
                            </View> : 
                            <View style={{width: '90%'}}>      
                                <View style={{flexDirection: 'row'}}>
                                    <IconMC name="truck-fast" color={"#4E66EB"} size={30}/>
                                    <Text style={styles.fast}>Receba em casa</Text>
                                </View>
                                <TouchableOpacity style={styles.addressButton} onPress={() => irAddress()}>
                                    <Text style={styles.addressInfo}>Informe seu endereço</Text>
                                    <IconI name="information-circle" size={20} color="#EEAD2D"/>
                                </TouchableOpacity>
                            </View>
                        }
                        
                        <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginTop: 5}}></View>
                        <View style={{flexDirection: 'row', width: '90%', marginTop: 8}}>
                            <Text style={styles.total}>Total do pedido</Text> 
                            <Text style={styles.pay}>R$ {totalWithShipping},00</Text> 
                        </View>
                        <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 5}}></View>
                        <TouchableOpacity style={styles.footerMain} onPress={()=> payment()}>
                            <Text style={styles.titleFinish}>Pagamento</Text>
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
    viewScreen:{
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
    addressButton:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginTop: 5,
        marginBottom: 5
    },    
    addressTitle:{
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        color: 'black',
        width: '90%',
    },
    addressInfo:{
        fontSize: 15,
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Montserrat-Medium',
        marginRight: 5,
        textAlign: 'justify'
    },
    bag:{
        width: '90%',
        marginBottom: 25,
        height: 170,
        backgroundColor: "white",
        borderRadius: 20,
        borderColor: '#E1E1E1',
        borderWidth: 2,
        alignItems: 'center'
    },
    headerBag:{
        backgroundColor: 'white',
        height: 120,
        width: "100%",
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:  20
    },
    imageBag:{
        height: 90, 
        width: "35%",
        marginEnd: 30
    },
    titleBag:{
        fontSize: 20,
        color: 'black',
        marginBottom: 20,
        fontFamily: 'Montserrat-Medium'
    },
    priceBag:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat-Medium'
    },
    amount:{
        flexDirection: "row"
    },
    viewAmountTxt:{
        width: 30,
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#A8A2A2',
        borderTopWidth: 0.7,
        borderBottomWidth: 0.7
    },
    button:{
        width: 20,
        height: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        borderColor: '#A8A2A2',
        borderWidth: 0.7
    },
    pressButton:{
        fontSize:15,
        color: "black",
        fontFamily: 'Montserrat-Medium'
    },
    textAmount:{
        fontSize:15,
        color: "black",
        fontFamily: 'Montserrat-Regular'
    },
    fast:{
        fontSize: 18, 
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        marginLeft: 10
    },
    fastShipping:{
        fontSize: 18, 
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
        width: "75%"
    },
    valueShipping:{
        fontSize: 18, 
        color: 'black',
        fontFamily: 'Montserrat-Regular',
        marginTop: 10,
        width: "25%"
    },
    total:{
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        marginBottom: 8,
        color: 'black',
        width: '50%',
    },
    pay:{
        fontSize: 19,
        fontFamily: 'Montserrat-SemiBold',
        color: 'black',
        width: '50%',
        textAlign: "right"
    },    
    footerMain:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4E66EB',
        width: "90%",
        height: 55,
        marginTop: 60,
        borderRadius: 20
    },
    titleFinish:{
        fontSize: 25,
        color: 'white',
        fontFamily: 'Montserrat-Bold'
    } 
    
})
import react, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    StyleSheet,
    Alert,
    BackHandler
} from "react-native"
import SwiperComponent from '../componets/Swiper'
import { useNavigation } from "@react-navigation/native"
import { useBag } from "../context/cartContext";

export default function Detail({route}){
    const[txtShipping, setTxtShipping] = useState(false)
    const[item, setItem] = useState([{id: route.params?.id, image1: route.params?.image1, image2: route.params?.image2, 
        image3: route.params?.image3, name:route.params?.name, price:route.params?.price, description:route.params?.description}])
    
    const navigation = useNavigation()

    const {addBag} = useBag()
    const {bag} = useBag()

    function passCart(){
        let verification = true
        bag.map((item) => {
            if(item.id != route.params?.id){
                verification = true
            }else{
                verification = false
            }
        })

        if(verification == true){
            addBag(route.params?.id, route.params?.image1, route.params?.image2, route.params?.image3, route.params?.name, route.params?.price, route.params?.description)
            Alert.alert(
                "Adicionado com sucesso!!"
            )
        }else{
            Alert.alert(
                "Item já foi adicionado!"
            )   
        }
        
    }

    function backHome(){
        navigation.navigate("home", {update: 'update'})
        return true
    }

    useEffect(() => {
        sync()
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backHome)
        return () => backHandler.remove()
    }, [route])

    function sync(){
        if(route.params?.cep == undefined){
            setTxtShipping(false)
        }else{
            setTxtShipping(route.params?.txtShipping)
        }
    }

    function irFinish(){
        navigation.navigate('finish', {cartBag: item, cep: route.params?.cep, place: route.params?.place, shipping: route.params?.shipping, 
                                        txtShipping: true, date: route.params?.date, screen: 'detail', price: route.params?.price, dateSold: route.params?.dateSold})
    }

    function irAddress(){
        navigation.navigate('address', {screen: 'detail', image1: route.params?.image1, image2: route.params?.image2, 
                            image3: route.params?.image3, name:route.params?.name, price:route.params?.price, description:route.params?.description, dateSold: route.params?.dateSold})
    }
    return(
        <View>
            <View style={styles.headerMain}>
                <TouchableOpacity style={{marginRight: 30, width: '50%'}} onPress={()=> navigation.navigate("home", {update: 'update'})}>
                
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 110, width: '50%'}} onPress={()=> navigation.navigate('cart', {dateSold: route.params?.dateSold})}>
                
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="white">
            <View style={styles.container}>
                <View style={styles.swiperContent}>
                    <SwiperComponent
                    cover={route.params?.image1}
                    cover2={route.params?.image2}
                    cover3={route.params?.image3}                    
                    />
                </View>
                    
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.title}>{route.params?.name}</Text>
                        <Text style={styles.price}>R$ {route.params?.price},00</Text>
                    </View>
                    <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 5}}>
                        
                    </View>
                </View>

                <TouchableOpacity 
                style={styles.bottonPurchase} onPress={()=> irFinish()}>
                    <Text style={styles.purchase}>Comprar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottonAdd} onPress={() => passCart()}>
                    <Text style={styles.add}>Adicionar ao carrinho</Text>
                </TouchableOpacity>

                <View style={styles.footerDesc}>
                    <Text style={styles.subtitle}>Descrição do produto</Text>
                    <Text style={styles.description}>{route.params?.description}</Text>
                </View>
                
                <View style={styles.footer}>
                    <View style= {{alignItems: 'center'}}>
                        <Text style={styles.subtitle2}>Calcular Frete</Text>
                    </View>

                        <TouchableOpacity onPress={() => irAddress()} style={styles.imputHeader}>
                            
                            {txtShipping? <Text 
                            style={styles.imput} 
                            numberOfLines={1} 
                            ellipsizeMode={'tail'}
                            >CEP:{route.params?.cep}, {route.params?.place}</Text> :
                            <Text style={styles.imput}>Busque seu endereço...</Text>}
                            <Text style={styles.changeAddress}>Buscar</Text>
                        </TouchableOpacity>    
                    {txtShipping? <Text style={{fontSize: 14}}>Chegará em {route.params?.date} por R$ {route.params?.shipping},00</Text> : 
                    
                    <Text style={{fontSize: 14}}>Informe seu endereço</Text>}
                </View>
            
            </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    headerMain:{
        paddingHorizontal: 15,
        backgroundColor: "white",
        flexDirection: 'row',
        width: '100%',
        height: '7%',
        paddingTop: 15
    },
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    swiperContent:{
        flexDirection: 'row',
        height: "33%",
        width: "100%"
    },
    headerContent:{
        paddingHorizontal: 24,
        alignItems: 'baseline',
        width : '100%',
        marginTop: 20
    },
    title:{
        fontSize: 20,
        color:'black',
        fontWeight: '600'
    },
    price:{
        fontSize: 20,
        fontWeight: "400",
        color: 'black'
    },
    myStarStyles:{
        color: '#E7AE4e',
        backgroundColor: 'transparent'
    },
    bottonPurchase:{
        alignItems: 'center',
        backgroundColor: "red",
        marginBottom: 5,
        marginTop: 20,
        marginRight: 5,
        marginLeft: 24,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
        width: 340,
        height: 50
    },
    purchase:{
        fontSize: 20,
        color: 'white',
        fontWeight: '600'
    },
    bottonAdd:{
        alignItems: 'center',
        backgroundColor: "white",
        marginBottom: 5,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 24,
        paddingVertical: 10,
        borderRadius: 15,
        elevation: 2,
        width: 340,
        height: 50,
    },
    add:{
        fontSize: 20,
        color: 'red',
        fontWeight: '600'
    },
    footerDesc:{
        marginTop: 20,
        marginLeft: 24,
        marginRight: 20
    },
    subtitle:{
        fontSize: 17,
        fontWeight: '500',
        color: 'black',
        marginBottom: 5
    },
    description:{
        fontSize: 14,
        textAlign: 'justify',
        color: 'black'
    },
    footer:{
        marginTop: 20,
        marginLeft: 24,
        marginRight: 20,
        marginBottom: 100,
        alignItems: 'center',
        height: 170,
        padding: 20,
        backgroundColor: "#D7D7D7",
        borderRadius: 20
    },
    subtitle2:{
        fontSize: 18,
        fontWeight: '500',
        color: 'black'
    },
    imputHeader:{
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '99%',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20,
        marginBottom: 25,
        marginTop: 15
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
        color: '#D7D7D7'
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
    sync:{
        marginLeft: 20
    }    
})


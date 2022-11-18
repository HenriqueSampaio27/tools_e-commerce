import react, {useState, useEffect} from "react";
import {
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    StyleSheet,
    Alert,
    BackHandler,
    TextInput,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from "react-native"
import SwiperComponent from '../componets/Swiper'
import { useNavigation } from "@react-navigation/native"
import { useBag } from "../context/cartContext"
import IconI from "react-native-vector-icons/Ionicons"
import IconZ from "react-native-vector-icons/Zocial"
import IconM from 'react-native-vector-icons/MaterialIcons'
import IconMC from "react-native-vector-icons/MaterialCommunityIcons"
import Stars from 'react-native-stars'
import New from '../componets/New'

export default function DetailUp({route}){
    const[txtShipping, setTxtShipping] = useState(false)
    const[favoriteIcon, setFavoriteIcon] = useState(false)
    const[descriptionText, setDescriptionText] = useState(false)
    const[dateShipping, setDateShipping] = useState()
    const[priceShipping, setPriceShipping] = useState()
    const[update, setUpdate] = useState(false)
    const[cep, setCep] = useState()
    const[rating, setRating] = useState(4)
    const[item, setItem] = useState([{id: route.params?.id, name:route.params?.name, price:route.params?.price, description:route.params?.description, image1: route.params?.image1, image2: route.params?.image2, image3: route.params?.image3}])
    const navigation = useNavigation()
    const {addBag} = useBag()
    const {bag} = useBag()

    const[id, setId] = useState(route.params?.id)
    const[name, setName] = useState(route.params?.name)
    const[price, setPrice] = useState(route.params?.price)
    const[description, setDescription] = useState(route.params?.description)
    const[image1, setImage1] = useState(route.params?.image1)
    const[image2, setImage2] = useState(route.params?.image2)
    const[image3, setImage3] = useState(route.params?.image3)
    const[soldAmount, setSoldAmount] = useState(route.params?.soldAmount)

    let installmentPrice
    let installmentPriceFloat

    function passCart(){
        let verification = true
        bag.map((item) => {
            if(item.id != id){
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

    function split(){
        let price2 = parseInt(route.params?.price)
        installmentPrice = price2/6
        installmentPrice = installmentPrice.toFixed(2)
        installmentPriceFloat = [installmentPrice[(installmentPrice.length)-2], installmentPrice[(installmentPrice.length)-1]]
        installmentPrice = parseInt(installmentPrice)
        installmentPrice = [installmentPrice, ",", installmentPriceFloat]
    }
    split()

    function passFavorite(){
        setFavoriteIcon(!favoriteIcon)
    }

    function irFinish(){
        navigation.navigate('info_pay', {cartBag: item, price: price, dateSold: route.params?.date, screen: "detail"})
    }

    function getDateCurrent(){
        const day = new Date().getDate()
        const month = new Date().getMonth()

        const monthName = ['Janeiro', 'Fevereiro', 'março', 'abril', 'Maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        if(month == 11){
            setDateShipping(day + ' de ' + monthName[0])
        }else{
            setDateShipping(day + ' de ' + monthName[month + 1])
        }
    }

    function calcShipping(){
        switch(cep[0]){
            case '0': 
                setPriceShipping("15,00")
                break
            case '1':
                setPriceShipping("23,00")
                break
            case '2': 
                setPriceShipping("25,00")
                break
            case '3':
                setPriceShipping("28,00")
                break
            case '4': 
                setPriceShipping("30,00")
                break
            case '5':
                setPriceShipping("35,00")
                break
            case '6': 
                setPriceShipping("38,00")
                break
            case '7':
                setPriceShipping("20,00")
                break
            case '8': 
                setPriceShipping("42,00")
                break
            case '9':
                setPriceShipping("46,00")
                break                    
        }
    }

    async function calculateAddress(){
        const checksCEP = /^[0-9]{8}$/
        
        if(checksCEP.test(cep)){
            let req = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            
            let res = await req.json()
            if(!("erro" in res)){
                getDateCurrent()
                setTxtShipping(true)
                calcShipping()
            }else{
                setTxtShipping(false)
                Alert.alert(
                    'CEP não encontrado!',
                    'Digite um CEP existente'
                    )
            }
        }else{
            setTxtShipping(false)
            Alert.alert(
                'Formato de CEP inválido!',
                'Digite um CEP válido no Formato `00000000`'
                )
        }
    }

    function setDetail(id, name, price, description, image1, image2, image3, soldAmount){
        setId(id)
        setName(name)
        setPrice(price)
        setDescription(description)
        setImage1(image1)
        setImage2(image2)
        setImage3(image3)
        setSoldAmount(soldAmount)        
    }
    
    return(
        <View>
            <View style={styles.headerMain}>
                <TouchableOpacity style={{marginRight: 30, width: '50%'}} onPress={()=> navigation.navigate("drawer", {update: 'update'})}>
                    <IconI name="chevron-back-circle-outline" size={35} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 110, width: '50%'}} onPress={()=> navigation.navigate('cart', {dateSold: route.params?.dateSold})}>
                    <IconZ name="cart" size={30} color="black"/>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} backgroundColor="white">
            <View style={styles.container}>
                <View style={styles.swiperContent}>
                    <SwiperComponent
                    cover={image1}
                    cover2={image2}
                    cover3={image3}                    
                    />
                </View>
                    
                <View style={styles.headerContent}>
                    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>                       
                        <Text style={styles.price}>R$ {price}</Text>
                        <TouchableOpacity onPress={() => passFavorite()}>
                            {
                                favoriteIcon? <IconM name="favorite" color="red" size={30}/>:
                                <IconM name="favorite-border" color="black" size={30}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 5, marginTop: 5}}>
                        <Text style={styles.installment}>até 6x de R$ {installmentPrice}</Text>
                        <Text style={styles.fees}> sem juros</Text>
                    </View>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Stars
                        default={rating}
                        count={5}
                        half={false}
                        fullStar={<IconI name="star" color={"#FFFF00"} size={20}/>}
                        emptyStar={<IconI name="star-outline" color={"black"} size={20}/>}
                        />
                        <Text style={styles.ratingStar}>{rating}.0</Text>
                        <View style={{backgroundColor: '#E1E1E1', width: 1, marginRight: 5, marginLeft: 5}}></View>
                        <Text style={styles.amountSold}>{soldAmount} pedidos</Text>
                    </View>
                </View>

                <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 10, marginTop: 25}}></View>
                <TouchableOpacity style={{flexDirection: 'row', width: "90%"}} onPress={() => setDescriptionText(!descriptionText)}>
                    <Text style={styles.descriptionTitle}>Descrição do produto</Text>
                    {
                        descriptionText? 
                        <IconM name="keyboard-arrow-down" size={32} color="gray"/> : <IconM name="navigate-next" size={32} color="gray"/>    
                    }
                    
                </TouchableOpacity>
                {
                    descriptionText? 
                    <View style={{width: "90%", marginTop: 10, marginBottom: 10}}>
                        <Text style={styles.description}>{description}</Text>
                    </View>: null
                }
                <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 25, marginTop: 5}}></View>
                
                <TouchableOpacity style={styles.buttonPurchase} onPress={()=> irFinish()}>
                    <Text style={styles.purchase}>Comprar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonAdd} onPress={() => passCart()}>
                    <Text style={styles.add}>Adicionar ao carrinho</Text>
                </TouchableOpacity>

                <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 10, marginTop: 25}}></View>
                <View style={{width: '90%'}}>
                    <Text style={styles.subtitle}>Calcule o frete e o prazo de entrega</Text>

                    <View style={styles.inputHeader}>
                        <TextInput style={styles.input} 
                        placeholder= "Digite seu CEP" 
                        keyboardType="numeric" 
                        placeholderTextColor={"#6A6868"}
                        onChangeText={text =>{ 
                            setCep(text)
                        }}
                        maxLength = {8}
                        ></TextInput>
                        <TouchableOpacity style={styles.ButtonSearch} onPress={() => calculateAddress()}>
                            <Text style={styles.search}>OK</Text>
                        </TouchableOpacity>
                    </View>    
                    {txtShipping? 
                        <View style={{width: '90%'}}>      
                            <View style={{flexDirection: 'row'}}>
                                <IconMC name="truck-fast" color={"#4E66EB"} size={30}/>
                                <Text style={styles.fast}>Receba em casa</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={styles.fastShipping}>em até {dateShipping}</Text>
                                <Text style={styles.valueShipping}>R$ {priceShipping}</Text>
                            </View>
                            
                        </View> : null}
                </View>
                <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 15, marginTop: 15}}></View>
            
                <View style={{marginBottom: 100, width: "90%"}}>
                    <Text style={styles.footer}>Aproveite e veja também</Text>
                    <FlatList 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            data={route.params?.date}
                            extraData={route.params?.date}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 
                                <New
                                cover= {item.image1}
                                name= {item.name}
                                price= {item.price}
                                onPress={() =>  navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                    image1: item.image1, image2: item.image2, image3: item.image3, soldAmount: item.soldAmount, date: route.params?.date})}
                                />
                            }
                            />
                    <View style={{backgroundColor: '#E1E1E1', width: "100%", height: 2, marginBottom: 15, marginTop: 15}}></View>
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
        backgroundColor: 'white',
        alignItems: 'center'
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
    name:{
        fontSize: 22,
        color:'black',
        fontFamily: 'Montserrat-Medium',
    },
    price:{
        fontSize: 28,
        width: '90%',
        fontFamily: 'Montserrat-SemiBold',
        color: 'black'
    },
    installment:{
        fontSize: 16,
        color:'black',
        fontFamily: "Montserrat-Medium"
    },
    fees:{
        fontSize: 16,
        color:'#00C343',
        fontFamily: "Montserrat-Medium"
    },
    amountSold:{
        color: 'black',
        fontFamily: "Montserrat-Regular",
        fontSize: 15
    },
    ratingStar:{
        color: 'black',
        fontFamily: "Montserrat-Regular",
        fontSize: 15,
        marginLeft: 3,
        marginRight: 2
    },
    descriptionTitle:{
        fontSize: 20,
        color:'black',
        fontFamily: 'Montserrat-SemiBold',
        width: "90%"
    },
    description:{
        fontSize: 16,
        color:'black',
        fontFamily: 'Montserrat-Medium',
        width: "100%",
        textAlign: 'justify'
    },
    buttonPurchase:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#4E66EB",
        marginBottom: 5,
        marginTop: 20,
        borderRadius: 15,
        width: "90%",
        height: 55
    },
    purchase:{
        fontSize: 22,
        color: 'white',
        fontFamily: 'Montserrat-SemiBold'
    },
    buttonAdd:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white",
        marginBottom: 20,
        marginTop: 15,
        borderRadius: 15,
        borderColor: '#4E66EB',
        borderWidth: 2,
        width: "90%",
        height: 55,
    },
    add:{
        fontSize: 20,
        color: '#4E66EB',
        fontFamily: "Montserrat-SemiBold"
    },
    subtitle:{
        fontSize: 17,
        fontFamily: "Montserrat-Medium",
        color: 'black',
        marginBottom: 5
    },
    inputHeader:{
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        marginTop: 15,
    },   
    input:{
        fontSize: 15,
        width: '88%',
        height: 40,
        color: 'black',
        borderColor: "#E1E1E1",
        borderWidth: 1,
        fontFamily: "Montserrat-Medium"
    },
    ButtonSearch:{
        backgroundColor: '#4E66EB',
        alignItems: 'center',
        justifyContent: 'center',
        width: "12%"
    },
    search:{
        color: 'white',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15
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
        width: "85%"
    },
    valueShipping:{
        fontSize: 18, 
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        marginTop: 10,
        width: "25%"
    },
    footer:{
        fontSize: 18,
        color:'black',
        fontFamily: 'Montserrat-SemiBold',
        width: "100%",
        textAlign: 'justify'
    }
})


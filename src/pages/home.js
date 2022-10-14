import react, {useEffect, useState} from "react"
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    FlatList,  
    TouchableOpacity,
    Dimensions
    }from "react-native"
import New from '../componets/New'
import { useNavigation } from "@react-navigation/native"
import IconZ from "react-native-vector-icons/Zocial"
import IconI from "react-native-vector-icons/Ionicons"
import db from "../connection/firebaseConnection"
import { collection, getDocs } from "firebase/firestore"
import {tools, tools2} from "../../db"
import Carrousel from "../componets/Carrousel"

const {width, height} = Dimensions.get("screen")


export default function Home({route}){
    

    const[dateNews, setDateNews] = useState(tools)
    const[dateInterest, setDateInterest] = useState(tools)
    const[dateWanted, setDateWanted] = useState(tools)
    const[dateSold, setDateSold] = useState(tools)
    const[date, setDate] = useState(tools2)
    const navigation = useNavigation()
    
    

    useEffect(() => {
        //readNews()
        //readInterest()
        //readWanted()
        //readSold()
    }, [route])
    
    return(
        <View>
            <View style={styles.headerTitle}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: "35%", alignItems: "center", paddingTop: 5}}>
                        <IconI name="list" size={40} color="white"/>
                    </TouchableOpacity>
                    <Text style={styles.titleMain}>{"\t\t\t\t\t\t"}REI DAS{"\n"}FERRAMENTAS</Text>
                    <TouchableOpacity style={{width: "20%"}} onPress={()=> navigation.navigate('cart', {dateSold: dateSold})}>
                        <IconZ name="cart" size={35} color="white"/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.inputArea} onPress= {() => navigation.navigate('search', {dateNews: dateNews, dateInterest: dateInterest, dateWanted: dateWanted})}>
                    <Text style={styles.input}>O que está procurando...</Text>
                    <IconI name="search" size={25} color="black"/>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: "#2799F3"}}>
                <ScrollView 
                style={{backgroundColor: "#F0EEEE", borderTopLeftRadius: 50, borderTopRightRadius: 50}}
                showsVerticalScrollIndicator={false}>
                    <View style={styles.carrousel}>
                        <Carrousel date={date}/>
                    </View>
                    <View style= {styles.contentnew}> 
                        <Text style={styles.title}>Novidades</Text>
                    </View>
                        <FlatList 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        data={dateNews}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => 
                            <New
                            cover= {item.image1}
                            name= {item.name}
                            price= {item.price}
                            onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                        image1: item.image1, image2: item.image2, image3: item.image3, dateSold: dateSold})}
                            />
                        }
                        />

                    <View style= {styles.contentnew2}>
                        <Text style={styles.title}>Você pode se interessar</Text>
                    </View>
                    <FlatList 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    data={dateInterest}
                    extraData={dateInterest}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <New
                        cover= {item.image1}
                        name= {item.name}
                        price= {item.price}
                        onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                    image1: item.image1, image2: item.image2, image3: item.image3, dateSold: dateSold})}
                        />
                    }
                    />

                    <View style= {styles.contentnew2}>
                        <Text style={styles.title}>Mais procurados</Text>
                    </View>
                    <FlatList 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    data={dateWanted}
                    extraData={dateWanted}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <New
                        cover= {item.image1}
                        name= {item.name}
                        price= {item.price}
                        onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                    image1: item.image1, image2: item.image2, image3: item.image3, dateSold: dateSold})}
                        />
                    }
                    />

                    <View style= {styles.contentnew2}>
                        <Text style={styles.title}>Mais vendidos</Text>
                    </View>
                    <FlatList 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    data={dateSold}
                    extraData={dateSold}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => 
                        <New
                        cover= {item.image1}
                        name= {item.name}
                        price= {item.price}
                        onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                    image1: item.image1, image2: item.image2, image3: item.image3, dateSold: dateSold})}
                        />
                    }
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle:{
        backgroundColor: "#2799F3",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        height: '16%',
    },
    titleMain:{
        fontSize: 20,
        color: "white",
        fontFamily: 'Montserrat-Bold',
        width: "55%",
        marginBottom: 20
    },
    inputArea:{
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20
    },
    input:{
        color: "#564F4F",
        fontSize: 14,
        fontFamily: "Montserrat-Medium",
        borderRadius: 20,
        width: '90%',
        marginTop: 10,
        marginBottom: 8,
        paddingLeft: 8
    },
    carrousel:{
        width: width-40,
        height: (height/3) - 60,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        elevation: 5
    },
    contentnew:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    contentnew2:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 10
    },
    title:{
        paddingHorizontal: 15,
        fontSize: 20,
        color: "black",
        marginTop:10,
        fontWeight: "500"
    }
})
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
import Product from "../componets/Product"
import {useDrawerStatus} from '@react-navigation/drawer'

const {width, height} = Dimensions.get("screen")


export default function Home({route}){
    

    const[dateNews, setDateNews] = useState(tools)
    const[dateInterest, setDateInterest] = useState(tools)
    const[dateWanted, setDateWanted] = useState(tools)
    const[dateSold, setDateSold] = useState(tools)
    const[date, setDate] = useState(tools2)
    const navigation = useNavigation()
    const navigation2 = useDrawerStatus()
    const[drawer, setDrawer] = useState(false)
    
    function activityDrawer(){
        if(drawer == true){
            return(
                <View>

                </View>
            )
        }
    }

    let category = ["dateSold", "Eletricos", "Chaves", "Eletrônicos", "Bombas", "Mangueiras"]
    let categoryDate
    function loadCategory(categoryName){
        categoryDate = categoryName
    }

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
                        <TouchableOpacity style={{width: "35%", alignItems: "center", paddingTop: 5}} onPress={() => navigation.openDrawer()}>
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
                <ScrollView style={{height: "84%"}}>
                    <View style={{backgroundColor: "#2799F3"}}>
                        <ScrollView 
                        style={{backgroundColor: "#F0EEEE", borderTopLeftRadius: 50, borderTopRightRadius: 50, height: "100%"}}
                        showsVerticalScrollIndicator={false}>
                            <View style={styles.carrousel}>
                                <Carrousel date={date}/>
                            </View>

                            <View style= {styles.contentnew}>
                                <Text style={styles.title}>Destaques</Text>
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
                                                                            image1: item.image1, image2: item.image2, image3: item.image3, sold: item.solddate, dateSold: dateSold})}
                                />
                            }
                            />

                            <View style= {styles.contentnew}>
                                <Text style={styles.title}>Você pode se interessar</Text>
                            </View>
                            <FlatList 
                            horizontal 
                            showsHorizontalScrollIndicator={false}
                            data={date}
                            extraData={date}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => 
                                <New
                                cover= {item.image1}
                                name= {item.name}
                                price= {item.price}
                                onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                            image1: item.image1, image2: item.image2, image3: item.image3, sold: item.solddate, dateSold: dateSold})}
                                />
                            }
                            />

                            <View style= {styles.contentnew}>
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
                                                                            image1: item.image1, image2: item.image2, image3: item.image3, sold: item.solddate, Sold: dateSold})}
                                />
                            }
                            />

                            <FlatList
                            horizontal
                            showsHorizontalScrollIndicator= {false}
                            data={category}
                            keyExtractor={(item, index) => index}
                            renderItem={({item, index}) => {
                                return(
                                    <TouchableOpacity style={styles.categoryItens} onPress={() => loadCategory(category[index])}>
                                        <Text style={styles.categoryText}>{category[index]}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                            />
                            <ScrollView horizontal style={{width: '100%', margin: 10}}>
                                <FlatList 
                                vertical
                                data={dateSold}
                                numColumns={2}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => 
                                    <Product
                                    cover= {item.image1}
                                    name= {item.name}
                                    price= {item.price}
                                    sold = {item.sold}
                                    onPress={() => navigation.navigate("detail",{id: item.id, name: item.name, price: item.price, description: item.description,
                                                                                image1: item.image1, image2: item.image2, image3: item.image3, sold: item.solddate, dateSold: dateSold})}
                                    />
                                }
                                />
                            </ScrollView>

                        </ScrollView>
                    </View>
                </ScrollView>
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
        alignItems: 'center',
        marginTop: 10
    },
    title:{
        paddingHorizontal: 15,
        fontSize: 18,
        color: "black",
        fontFamily: "Montserrat-SemiBold",
        marginTop:10
    },
    categoryItens:{
        height: 28,
        width: 125,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2799F3',
        margin: 5,
        marginTop: 10,
        borderRadius: 20
    },
    categoryText:{
        color: 'white',
        fontFamily: 'Montserrat-Bold',
        fontSize: 15
    }
})
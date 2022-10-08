import react, {useEffect, useState} from "react"
import {
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    FlatList,  
    TouchableOpacity
    }from "react-native"
import New from '../componets/New'
import { useNavigation } from "@react-navigation/native"
import db from "../connection/firebaseConnection"
import { collection, getDocs } from "firebase/firestore"

export default function Home({route}){
    const[dateNews, setDateNews] = useState([])
    const[dateInterest, setDateInterest] = useState([])
    const[dateWanted, setDateWanted] = useState([])
    const[dateSold, setDateSold] = useState([])
    const navigation = useNavigation()
    
    async function readNews(){
        const news = []
        const querySnapshot = await getDocs(collection(db, "news"));
        querySnapshot.forEach((doc) => {
    
            news.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                description: doc.data().description,
                image1: doc.data().image1,
                image2: doc.data().image2,
                image3: doc.data().image3
            })  
        })    
        setDateNews([...news])
    }
    
    async function readInterest(){
        const interest = []
        const querySnapshot = await getDocs(collection(db, "interest"));
        querySnapshot.forEach((doc) => {
    
            interest.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                description: doc.data().description,
                image1: doc.data().image1,
                image2: doc.data().image2,
                image3: doc.data().image3
            })  
        })    
        setDateInterest([...interest])
    }

    async function readWanted(){
        const wanted = []
        const querySnapshot = await getDocs(collection(db, "wanted"));
        querySnapshot.forEach((doc) => {
            wanted.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                description: doc.data().description,
                image1: doc.data().image1,
                image2: doc.data().image2,
                image3: doc.data().image3
            })  
        })    
        setDateWanted([...wanted])
    }

    async function readSold(){
        const sold = []
        const querySnapshot = await getDocs(collection(db, "sold"));
        querySnapshot.forEach((doc) => {
            sold.push({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                description: doc.data().description,
                image1: doc.data().image1,
                image2: doc.data().image2,
                image3: doc.data().image3
            })  
        })    
        setDateSold([...sold])
    }

    useEffect(() => {
        readNews()
        readInterest()
        readWanted()
        readSold()
    }, [route])
    
    if(dateInterest.length < 6){
        return(
            <View style={{flex: 1, alignItems: "center", justifyContent: 'center'}}>
                
                <Text style={{fontSize: 20, color: 'black', marginTop: 10}}>Carregando...</Text>
            </View>
        )
        
    }
    
    return(
        <View style={{backgroundColor: '#D7D7D7'}}>
            <View style={styles.headerMain}>
                <Text style={styles.titleMain}>REI DAS FERRAMENTAS</Text>
                <TouchableOpacity style={{marginLeft: 100}} onPress={()=> navigation.navigate('cart', {dateSold: dateSold})}>
                </TouchableOpacity>
            </View>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style ={{backgroundColor: '#D7D7D7', width: '100%', marginBottom: 55}}>
                <View style={styles.header}>
                    <View style={styles.imputArea}>
                        <TouchableOpacity style={styles.imputArea} onPress= {() => navigation.navigate('search', {dateNews: dateNews, dateInterest: dateInterest, dateWanted: dateWanted})}>
                            <Text style={styles.imput}> Busque seu produto</Text>
                            
                        </TouchableOpacity>    
                    </View>
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
    titleMain:{
        fontSize: 20.4,
        color: "red",
        fontWeight: "500"
    },
    header:{
        paddingHorizontal: 15,
        backgroundColor: "#D7D7D7",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%', 
        marginVertical: 20
    },
    imputArea:{
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        width: '99%',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20
    },
    imput:{
        color: "#808080",
        fontSize: 14,
        borderRadius: 20,
        width: '90%',
        marginTop: 10,
        marginBottom: 8
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
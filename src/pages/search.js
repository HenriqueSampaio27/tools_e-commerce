import react, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { deleteDoc, doc, setDoc } from "firebase/firestore"
import db from '../connection/firebaseConnection'

export default function Search({route}){

    const[dateAux, setDateAux] = useState([])
    const[date, setDate] = useState([])
    const [wantedAux, setWantedAux] = useState([])

    const navigation = useNavigation()

    const[interest, setInterest] = useState(route.params?.dateInterest)
    const[news, setNews] = useState(route.params?.dateNews)
    const[wanted, setWanted] = useState(route.params?.dateWanted)
    
    function somaa(){
        const newDate = [...news, ...interest]
        setDate([...newDate])
        setDateAux([...newDate]) 
    }
    
    async function updateWanted(id, name, price, description, image1, image2, image3){
        wanted.map((item) => {
            wantedAux.push(item.id)
        })

        let valueId
        let newWanted = wantedAux    
        if(wantedAux.length >= 5){
            valueId = wantedAux[0]
            newWanted = newWanted.filter(i => i != valueId)
            setWantedAux([...newWanted])
        }
        
        const data = {
            name: name,
            price: price,
            description: description,
            image1: image1,
            image2: image2,
            image3: image3
        }
        if(wanted.length == 5 && !wanted.includes(id)){
            await deleteDoc(doc(db, "wanted", valueId))
            await setDoc(doc(db, "wanted", id), data)
            navigation.navigate('detail', {
                name: name, price: price, description: description, 
                image1: image1, image2: image2, image3: image3})
        }else if(!wanted.includes(id)){          
            await setDoc(doc(db, "wanted", id), data)
            navigation.navigate('detail', {
                name: name, price: price, description: description, 
                image1: image1, image2: image2, image3: image3})
        }else if(wanted.includes(id)){
            navigation.navigate('detail', {
                id: id, name: name, price: price, description: description, 
                image1: image1, image2: image2, image3: image3})
        }
    }
    
    useEffect(() => {
        somaa()
    }, [])

    function searchItem(text){
        if(text){
            const newDate = dateAux.filter(item => {
                const itemDate = item.name? item.name.toUpperCase() : ''.toUpperCase()
                const textDate = text.toUpperCase()
                return itemDate.indexOf(textDate) > -1
            })
            setDate(newDate)
        }else{
            setDate(dateAux)
        }
    }    

        return(
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.imputArea}>
                        <TextInput 
                        placeholder="O que está procurando..."
                        style={styles.imput}
                        onChange={(text) => searchItem(text.nativeEvent.text)}
                        />
                        
                    </View>
                </View>
                <View style={styles.item}>
                {

                    date.map((item, index) => {
                        return(
                            <View key={index} >
                                <TouchableOpacity style={styles.itemView} onPress={() => updateWanted(item.id, item.name, item.price, 
                                item.description, item.image1, item.image2, item.image3)}>
                                    <Image
                                    source={{uri: item.image1}}
                                    style={styles.image}
                                    resizeMode={"contain"}
                                    />
                                    <View style = {styles.viewText}>
                                        <Text style={styles.nameItem} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#d7d7d7'   
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
        padding: 2,
        backgroundColor: "white",
        fontSize: 14,
        borderRadius: 20,
        width: '90%',
        marginTop: 10,
        marginBottom: 10
    },
    itemView:{
        paddingLeft: 15,
        marginBottom: 10,
        flexDirection: 'row',
        width: '85%' 
    },
    nameItem:{
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        fontSize: 17,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        paddingLeft: 15,
        paddingTop: 12
    },
    viewText:{
        width: '100%'
    },
    image:{
        height: 50,
        width: 50,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    }
})
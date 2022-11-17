import react, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { doc, setDoc } from "firebase/firestore"
import db from '../connection/firebaseConnection'
import IconI from 'react-native-vector-icons/Ionicons'

export default function Search({route}){

    const[dateAux, setDateAux] = useState(route.params?.date)
    const[date, setDate] = useState(route.params?.date)
    
    const navigation = useNavigation()
    
    async function updateWanted(id, name, price, description, image1, image2, image3){

        const data = {
            name: name,
            price: price,
            description: description,
            image1: image1,
            image2: image2,
            image3: image3
        }
        
        //await setDoc(doc(db, "wanted", id), data)
        
        navigation.navigate('detail', {
            id: id, name: name, price: price, description: description, 
            image1: image1, image2: image2, image3: image3})
        
    }

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
            <View>
                <View style={styles.headerTitle}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconI name="chevron-back-circle" size={28} color="white"/>
                    </TouchableOpacity>
                    <View style={styles.inputArea}>
                        <TextInput 
                        placeholder="O que está procurando..."
                        placeholderTextColor={"#808080"}
                        style={styles.input}
                        onChange={(text) => searchItem(text.nativeEvent.text)}
                        />
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <IconI name="search" size={25} color="black"/>
                        </TouchableOpacity>
                    </View>
                </View> 
                <ScrollView style={{backgroundColor: 'white', height: "92%", width: '100%'}}>
                    <View style={styles.item}>
                        {
                            date.map((item, index) => {
                                return(
                                    <TouchableOpacity style={styles.itemView} onPress={() => updateWanted(item.id, item.name, item.price, 
                                    item.description, item.image1, item.image2, item.image3)} key={index}>
                                        <Image
                                        source={{uri: item.image1}}
                                        style={styles.image}
                                        resizeMode={"contain"}
                                        />
                                        <View style = {styles.viewText}>
                                            <Text style={styles.nameItem} numberOfLines={1} ellipsizeMode={'tail'}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
}

const styles = StyleSheet.create({
    headerTitle:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: "8%",
        backgroundColor: '#2799F3'
    },
    inputArea:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'white',
        height: 40,
        borderRadius: 20,
        marginLeft: 10
    },
    input:{
        backgroundColor: "white",
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        borderRadius: 20,
        width: '90%',
    },
    item:{
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        marginBottom: 50,
        marginTop: 15
    },
    itemView:{
        paddingLeft: 15,
        marginBottom: 10,
        flexDirection: 'row',
        width: '90%',
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderRadius: 20
    },
    nameItem:{
        backgroundColor: 'white',
        color: "black",
        fontFamily: 'Montserrat-Medium',
        height: 50,
        fontSize: 17,
        paddingLeft: 15,
        paddingTop: 12
    },
    image:{
        height: 50,
        width: 50,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    }
})
import react, { useState } from "react"
import {View,Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import IconM from 'react-native-vector-icons/MaterialIcons'

export default function New(props){
    const[favoriteIcon, setFavoriteIcon] = useState(false)
    
    function passFavorite(){
        setFavoriteIcon(!favoriteIcon)
    }

    return(
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image style={styles.cover}
                source={{uri: props.cover}}
                resizeMode='contain'
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{props.name}</Text>
            </View>
            
            <View style ={{flexDirection: 'row', width: '100%'}}>
                <View style={styles.footer}>
                    <Text style={styles.price}>R$ {props.price}</Text>
                </View>
                <TouchableOpacity style={styles.favorites} onPress={() => passFavorite()}>
                    {
                        favoriteIcon? <IconM name="favorite" color="red" size={30}/>:
                        <IconM name="favorite-border" color="black" size={30}/>
                    }
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
        
    )
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginBottom: 8,
        marginTop: 20,
        marginRight: 15,
        marginLeft: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 2,
        width: 200,
        height: 270
    },
    cover:{
        borderRadius: 10,
        height: 150,
        width: 150
    },
    content:{
        marginLeft: 5,
        marginVertical: 10,
        width: "100%"
    },
    title:{
        marginTop: 5,
        fontSize: 16,
        color: "black",
        fontFamily: "Montserrat-SemiBold"
    },
    footer:{
        flexDirection: 'row',
        width: "80%",
        alignItems: 'center'
    },
    price:{
        fontSize: 20,
        marginLeft: 5,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold'
    },
    favorites:{
        width: "20%"
    }

})
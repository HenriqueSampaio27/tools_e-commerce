import react, { useState } from "react"
import {View,Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import IconM from 'react-native-vector-icons/MaterialIcons'

export default function OrderItem(props){
    const[favoriteIcon, setFavoriteIcon] = useState(false)
    
    function passFavorite(){
        setFavoriteIcon(!favoriteIcon)
    }

    return(
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Text style={styles.info}>Pedido a caminho</Text>
            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginBottom: 5}}></View>
            
            <View style={{flexDirection: 'row', width: '90%'}}>
                <Image style={styles.cover}
                    source={{uri: props.cover}}
                    resizeMode='contain'
                />
                <View style={styles.content}>
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{props.name}</Text>
                    <View style ={{flexDirection: 'row', width: '100%'}}>
                        <Text style={styles.price}>R$ {props.price}</Text>
                        <Text style={styles.price}>x{props.amount}</Text>
                    </View>
                </View>
            </View>
            
            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginTop: 2}}></View>
            <View style={styles.footer}>
                <Text style={styles.amount}>2 itens</Text>
                <Text style={styles.total}>Total R$ 2000,00</Text>
            </View>
            <View style={{backgroundColor: '#E1E1E1', width: "90%", height: 2, marginTop: 2}}></View>
            <View style={styles.footer}>
                <Text style={styles.detail}>Detalhes do pedido</Text>
                <IconM name="navigate-next" color={'#2799F3'} size={24}/>
            </View>
        </TouchableOpacity>
        
    )
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginBottom: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        borderColor: '#D7D7D7',
        borderWidth: 1,
        width: "100%",
        height: 230
    },
    cover:{
        borderRadius: 10,
        height: 130,
        width: "30%",
        marginLeft: 8
    },
    content:{
        marginLeft: 5,
        width: "70%"
    },
    title:{
        fontSize: 18,
        color: "black",
        fontFamily: "Montserrat-Medium",
        height: 75,
        width: '90%'
    },
    footer:{
        flexDirection: 'row',
        width: "90%",
    },
    price:{
        fontSize: 20,
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        width: '75%'
    },
    info:{
        color: 'red',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        marginBottom: 5,
        width: "90%"
    },
    amount:{
        color: '#837F7F',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        width: '40%'
    },
    total:{
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 15,
        width: '60%',
        textAlign: 'right'
    },
    detail:{
        fontSize: 18,
        color: "#2799F3",
        fontFamily: "Montserrat-Medium",
        width: '90%'
    }

})
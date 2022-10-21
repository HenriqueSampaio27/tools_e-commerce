import react from "react"
import {View,Text, TouchableOpacity, Image, StyleSheet} from 'react-native'

export default function Product(props){
    
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image style={styles.cover}
                source={{uri: props.cover}}
                resizeMode='contain'
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>{props.name}</Text>
            </View>
            
            <View style ={{width: '100%'}}>
                <Text style={styles.price}>R$ {props.price}</Text>
                <Text style={styles.sold}>{props.sold} vendidos</Text>
            </View>
        </TouchableOpacity>
        
    )
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginBottom: 5,
        marginTop: 10,
        marginRight: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        elevation: 2,
        width: 180,
        height: 300
    },
    cover:{
        borderRadius: 10,
        height: 150,
        width: 145
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
        height: 40,
        fontFamily: "Montserrat-SemiBold"
    },
    price:{
        fontSize: 20,
        color: 'black',
        width: "100%",
        fontFamily: 'Montserrat-SemiBold'
    },
    sold:{
        color: '#5B5A5A',
        fontFamily: "Montserrat-Medium",
        fontSize: 15,
        width: "100%",
        marginTop: 10
    }

})
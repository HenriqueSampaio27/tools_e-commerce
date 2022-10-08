import react from "react"
import {View,Text, TouchableOpacity, Image, StyleSheet} from 'react-native'


export default function New(props){
    return(
        <TouchableOpacity onPress={props.onPress} style={styles.container}>
            <Image style={styles.cover}
                source={{uri: props.cover}}
                resizeMode='contain'
            />
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>{props.name}</Text>
            </View>

            <View style={styles.footer}>
                <View style={{width: '80%'}}>
                    <Text style={styles.price}>R$ {props.price},00</Text>
                </View>
                <View styles={{width: '20%'}}>
                    
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffff",
        marginBottom: 5,
        marginTop: 20,
        marginRight: 15,
        marginLeft: 10,
        padding: 15,
        borderRadius: 15,
        elevation: 2,
        width: 200,
        height: 270
    },
    cover:{
        borderRadius: 10,
        height: 150,
        width: 170
    },
    content:{
        marginLeft: 5,
        marginVertical: 10,
        width: 150
    },
    title:{
        marginTop: 5,
        fontSize: 15,
        color: "black"
    },
    footer:{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        width: '100%'
    },
    price:{
        fontSize: 20,
        marginLeft: 5
    }

})
import React, {useEffect} from "react";
import {View, Text, Image, StyleSheet} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function TransitionScreen(){

    const navigation = useNavigation()
    
    setTimeout(function(){navigation.navigate("login")}, 3000)

    return(
        <View style={styles.constraint}>
            <Animatable.Image
            animation={"fadeInLeft"}
            source={require('../assets/image/img_login.png')}
            style={styles.image}
            resizeMode="contain"
            />
            <Animatable.Text animation={"fadeInUp"} style={styles.title}>REI DAS</Animatable.Text>
            <Animatable.Text animation={"fadeInUp"} style={styles.title}>FERRAMENTAS</Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    constraint: {
        backgroundColor: '#2799F3',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        height: 300,
        width: 320,
        marginBottom: 70
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 28,
        color: 'white'
    }
})
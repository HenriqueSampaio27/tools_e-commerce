import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions, ImageBackground } from 'react-native'

const {width, height} = Dimensions.get("screen")

export default function CarrouselItem(props){
    
    let price= props.price
    let installmentPrice
    let installmentPriceFloat
    let priceFloat
    
    function decimals(){
        let priceLength = price.length
        priceFloat = [price[priceLength-2], price[priceLength-1]]
    }
    decimals()

    function split(){
        price = parseInt(price)
        installmentPrice = price/6
        installmentPrice = installmentPrice.toFixed(2)
        installmentPriceFloat = [installmentPrice[(installmentPrice.length)-2], installmentPrice[(installmentPrice.length)-1]]
        installmentPrice = parseInt(installmentPrice)
    }
    split()
    
    return(
        <TouchableOpacity onPress={() => {}}>
                <View>
                <ImageBackground source={props.cover} style={styles.cardView} imageStyle={{borderRadius: 20}}>
                    <Image 
                    style={styles.image} 
                    source={{ uri: props.image1 }} 
                    resizeMode="contain"/>

                    <View style={styles.textView}>
                        <Text style={styles.itemNew}>Chegou!!</Text>
                        <Text style={styles.itemName} numberOfLines={2} ellipsizeMode={'tail'}>{props.name}</Text>
                        <Text style={styles.itemDescription}>a partir de</Text>
                            <Text style={styles.itemReal}>R$ 
                                <Text style={styles.itemPrice}>
                                {price}
                                <View style={{paddingBottom: 7}}><Text style={styles.priceFloat}>,{priceFloat}</Text></View>    
                                </Text>
                            </Text>
                        <Text style={styles.itemInstallment} numberOfLines={2}>em até{"\n"}6x de R${installmentPrice}
                        <View><Text style={{fontSize: 12, color: 'black', fontFamily: 'Montserrat-SemiBold'}}>,{installmentPriceFloat}</Text></View>
                        </Text>
                    </View>
                </ImageBackground>
                </View>
        </TouchableOpacity> 
        
    )
}

const styles = StyleSheet.create({
    cardView: {
        width: width-40,
        height: (height/4)-15,
        borderRadius: 20,
        flexDirection: 'row'
    },
    textView: {
        width: (width-50)/2,
        marginTop: 10
    },
    image: {
        width: (width-90)/2,
        height: (height/4)-33,
        borderRadius: 10,
        margin: 10
    },
    itemNew: {
        color: '#FFFF00',
        fontSize: 18,
        fontFamily: "Montserrat-SemiBold",
        marginBottom: 5,
        elevation: 10
    },
    itemName: {
        color: 'black',
        fontSize: 18,
        fontFamily: "Montserrat-SemiBold"
    },
    itemDescription:{
        color: "black",
        marginTop: 5,
        fontSize: 15,
        fontFamily: "Montserrat-Medium"
    },
    itemReal:{
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: 15
    },
    itemPrice:{
        color: 'black',
        fontFamily: 'Montserrat-Bold',
        fontSize: 35,
    },
    priceFloat:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: 'black'
    },
    itemInstallment:{
        color: 'black',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 17
    }
})


import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native'
import CarouselItem from './CarrouselItem'

const {width, height} = Dimensions.get("screen")

export default function Carrousel(props){
    const background1 = `${require("../assets/image/fundo_azul.png")}`
    const background2 = `${require("../assets/image/fundo_verde.png")}`
    const background3 = `${require("../assets/image/fundo_azul_3.png")}`
    const background4 = `${require("../assets/image/fundo_vermelho.png")}`
    const background5 = `${require("../assets/image/fundo_azul_2.png")}`
    let dateList = [...props.date]
    let images = [{background : background1}, {background: background2}, {background: background3}, 
        {background: background4}, {background: background5}]
    let date = []

    const scrollx = new Animated.Value(0)
    let position = Animated.divide(scrollx, width)

    function somaArray(){
        for (let i = 0; i< 5; i++) {
            date[i] = {...dateList[i], ...images[i]}
        }
    }
    somaArray()

    let flatList
    function infiteScroll(){
        const dateLength = date.length
        let scrollValue = 0
        let scrolled = 0

        setInterval(function(){
            scrolled++
            if(scrolled < dateLength){
                scrollValue = scrollValue + (width-40)
            }else{
                scrollValue = 0
                scrolled = 0
            }

            this.flatList.scrollToOffset({
                animated: true, offset: scrollValue
            })            
        }, 5000)
    }
    //infiteScroll()
    
    return (
        <View>
            <FlatList
                horizontal 
                ref={(ref) => this.flatList = ref}
                showsHorizontalScrollIndicator={false}
                data={date}
                keyExtractor={item => item.id}
                pagingEnabled
                scrollEnabled
                snapToAlignment="center"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                onScroll= {Animated.event([
                    {nativeEvent: {contentOffset: {x: scrollx}}}
                ], {useNativeDriver: false}
                )}
                renderItem={({item}) => { 
                    return(
                        <CarouselItem
                        image1 = {item.image1}
                        name= {item.name}
                        price={item.price}
                        cover={item.background}
                        />   
                    )
                }}
            />

            <View style={styles.dotView}>
                {date.map((_, i) => {
                    let opacity = position.interpolate({
                        inputRange: [i -1, i, i + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: 'clamp'
                    })
                    return(
                        <Animated.View
                        key={i}
                        style={{opacity, width: 10, height: 10, backgroundColor: 'blue', margin: 8, borderRadius: 5}}
                        />
                    )
                })}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    dotView:{ 
        flexDirection: 'row', 
        justifyContent: 'center' 
    }
})


//onScroll={Animated.event(
  //  [{ nativeEvent: { contentOffset: { x: scrollX } } }]
//)}
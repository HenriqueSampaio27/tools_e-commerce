import react from 'react'
import {View, StyleSheet, Text, Image} from 'react-native'
import Swiper from 'react-native-swiper'


export default function SwiperComponent(props){
    return(
        <Swiper 
        style={styles.wrapper} 
        dotStyle={{
            backgroundColor: '#D7D7D7',
            borderColor: 'black',
            borderWidth: 1,
            width: 10,
            height: 10,
            borderRadius: 10
        }}
        activeDotColor= 'black'
        activeDotStyle={{
            borderColor: 'black',
            borderWidth: 1,
            width: 10,
            height: 10,
            borderRadius: 10
        }}>
            <View style={styles.slide}>
                <Image
                    source={{uri: props.cover}}
                    style={{width: "100%", height: "100%"}}
                    resizeMode='contain'
                />
            </View>    

            <View style={styles.slide}>
                <Image
                    source={{uri: props.cover2}}
                    style={{width: "100%", height: "100%"}}
                    resizeMode='contain'
                />
            </View>    
            <View style={styles.slide}>
                <Image
                    source={{uri: props.cover3}}
                    style={{width: "100%", height: '100%'}}
                    resizeMode='contain'
                />
            </View>
        </Swiper>
    )
}

const styles = StyleSheet.create({
    wrapper:{

    },
    slide:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
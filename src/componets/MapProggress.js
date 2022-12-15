import React from "react";
import {View, Text, StyleSheet} from "react-native"

export default function MapProgress(props){
    
    if (!props.data || props.data.lenght === 0) return null;

    return (
        <View style={{flex: 1}}>
                {props.data.map((item, index) => {
                
                    return(
                        <View style={styles.verticalWrap} key={index}>
                            <View style={styles.itemWrap}>
                                <View style={item.isCurrent? styles.pointWrap: styles.pointWrapFalse}></View>
                                <View style={{ marginLeft: 5, flex: 1 }}>
                                <Text style={styles.title} numberOfLines={2}>
                                    {item.title}
                                </Text>
                                </View>
                            </View>
                            {index == 4? null : <View style={item.isCurrent ? styles.verticalLine: styles.verticalLineFalse}></View>}
                            
                        </View>
                    )
                
                })}
        </View>
  );
};

const styles = StyleSheet.create({
  verticalLine: {
    backgroundColor: '#0DEB23',
    width: 5,
    height: '85%',
    position: 'absolute',
    marginLeft: 32.5,
    marginTop: 30,
  },
  verticalLineFalse:{
    backgroundColor: 'white',
    width: 5,
    height: '85%',
    position: 'absolute',
    marginLeft: 32.5,
    marginTop: 30,
    borderColor: '#0DEB23',
    borderWidth: 1,
    borderTopWidth: 0
  },
  verticalWrap: {
    height: '20%'
  },
  itemWrap: {
    width: "100%",
    height: "48%",
    marginLeft: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  pointWrap: {
    backgroundColor: '#0DEB23',
    height: 20,
    width: 20,
    marginLeft: 5,
    borderRadius: 50,
    alignItems: 'center'
  },
  pointWrapFalse: {
    backgroundColor: 'white',
    height: 20,
    width: 20,
    marginLeft: 5,
    alignItems: 'center',
    borderColor: '#0DEB23',
    borderWidth: 1,
    borderRadius: 50
  },
  title: { 
    color: 'black',
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    marginLeft: 10,
    width: "60%"
 }
});
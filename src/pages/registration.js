import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

export default function Registration(){
    
    function verificationLogin(){
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    return (
        <ScrollView>
            <View style={styles.header}>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header:{

    }
})
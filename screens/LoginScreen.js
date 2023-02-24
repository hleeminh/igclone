import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import LoginForm from '../components/login/LoginForm'


const LoginScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 2, backgroundColor: 'white', marginHorizontal: 30}}>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={require('../assets/header-logo.png')}
                        style={{
                            width: 200,
                            height: 100,
                            resizeMode: 'contain'
                        }}
                    />
                </View>
                <LoginForm navigation={navigation}/>
            </View>
        </View>

    )
}

export default LoginScreen
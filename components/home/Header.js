import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
    auth,
    signOut,
} from '../../firebase';

const handleSignout = async () => {
    await signOut(auth).then(() => {
        console.log('User signed out successfully!')
    }).catch((error) => {
        console.log(error.message)
    });
}

const Header = ({ navigation }) => {



    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    source={require('../../assets/header-logo.png')}
                    style={styles.logo}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity
                    // onPress={() => handleSignout()}
                    onPress={handleSignout}
                >
                    <Icon
                        name='sign-out'
                        style={{
                            fontSize: 30
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.push('NewPostScreen', { name: 'HLeeMinh' })}
                >
                    <Image
                        // source={require('../../assets/plus-2-math.png')}
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/plus-2-math.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        // source={require('../../assets/like.png')}
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/like--v1.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image
                        // source={require('../../assets/facebook-messenger.png')}
                        source={{
                            uri: 'https://img.icons8.com/fluency-systems-regular/60/fffffff/facebook-messenger.png'
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        height: 70
    },
    iconsContainer: {
        flexDirection: 'row'
    },
    logo: {
        width: 130,
        height: 65,
        resizeMode: 'contain',
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 25,
        resizeMode: 'contain',
    },
    unreadBadge: {
        backgroundColor: '#ff3250',
        position: 'absolute',
        left: 35,
        bottom: 18,
        width: 25,
        height: 18,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgeText: {
        color: 'white',
        fontWeight: '600'
    }
})

export default Header